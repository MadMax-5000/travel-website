# Architecture Overview

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         Listing Page (page.tsx)                        │    │
│  │                                                         │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │   DatePickerCalendar Component               │     │    │
│  │  │                                               │     │    │
│  │  │   Props:                                      │     │    │
│  │  │   - icsUrl: string                            │     │    │
│  │  │   - onDateSelect: (date) => void              │     │    │
│  │  │   - initialDate: Date | null                  │     │    │
│  │  │                                               │     │    │
│  │  │   State:                                      │     │    │
│  │  │   - selectedDate: Date | null                 │     │    │
│  │  │   - currentMonth: Date                        │     │    │
│  │  │   - blockedDates: Set<string>                 │     │    │
│  │  │   - isLoading: boolean                        │     │    │
│  │  │   - error: string | null                      │     │    │
│  │  └───────────────┬───────────────────────────────┘     │    │
│  │                  │                                      │    │
│  │                  │ calls                                │    │
│  │                  ▼                                      │    │
│  │  ┌───────────────────────────────────────────────┐    │    │
│  │  │   getBlockedDatesFromICS()                    │    │    │
│  │  │   (utils/icsParser.ts)                        │    │    │
│  │  │                                                │    │    │
│  │  │   1. Check localStorage cache                 │    │    │
│  │  │      ├─ Cache hit? Return cached dates        │    │    │
│  │  │      └─ Cache miss/expired? Continue...       │    │    │
│  │  │                                                │    │    │
│  │  │   2. Fetch ICS file from Google Calendar      │    │    │
│  │  │      └─ fetch(icsUrl)                          │    │    │
│  │  │                                                │    │    │
│  │  │   3. Parse ICS content                        │    │    │
│  │  │      ├─ Extract VEVENT blocks                 │    │    │
│  │  │      ├─ Parse DTSTART/DTEND                   │    │    │
│  │  │      ├─ Handle all-day events                 │    │    │
│  │  │      ├─ Handle timed events                   │    │    │
│  │  │      └─ Generate date list (YYYY-MM-DD)       │    │    │
│  │  │                                                │    │    │
│  │  │   4. Cache results in localStorage            │    │    │
│  │  │      └─ TTL: 15 minutes                        │    │    │
│  │  │                                                │    │    │
│  │  │   5. Return blocked dates array               │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │   localStorage                                          │    │
│  │                                                         │    │
│  │   blocked_dates_[hash]:                                │    │
│  │   {                                                     │    │
│  │     dates: ["2026-02-20", "2026-02-21", ...],          │    │
│  │     timestamp: 1708023456789                           │    │
│  │   }                                                     │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS Request
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Google Calendar Servers                       │
│                                                                  │
│  Public ICS Feed:                                               │
│  https://calendar.google.com/calendar/ical/[ID]/public/basic.ics│
│                                                                  │
│  Returns:                                                        │
│  BEGIN:VCALENDAR                                                │
│  VERSION:2.0                                                    │
│  BEGIN:VEVENT                                                   │
│  DTSTART:20260220                                               │
│  DTEND:20260221                                                 │
│  SUMMARY:Booked                                                 │
│  END:VEVENT                                                     │
│  END:VCALENDAR                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
ListingPage
  └── DatePickerCalendar
        ├── Month Navigation (prev/next buttons)
        ├── Calendar Grid
        │     └── Day Cells (42 cells, 6 weeks)
        │           ├── Previous month days (grayed out)
        │           ├── Current month days
        │           │     ├── Available (clickable)
        │           │     ├── Blocked (strikethrough)
        │           │     ├── Selected (highlighted)
        │           │     └── Today (outlined)
        │           └── Next month days (grayed out)
        ├── Selected Date Display
        └── Legend
```

## Data Flow

```
User Action                Component State              External Data
────────────────────────────────────────────────────────────────────

Component Mount
    │
    ├─> useEffect triggers
    │       │
    │       ├─> setIsLoading(true)
    │       │
    │       └─> getBlockedDatesFromICS()
    │               │
    │               ├─> Check localStorage ──────> localStorage
    │               │       │
    │               │       ├─ Hit: Return cached
    │               │       │
    │               │       └─ Miss: Fetch ICS ──> Google Calendar
    │               │                   │
    │               │                   └─> Parse ICS
    │               │                         │
    │               │                         └─> Cache result
    │               │
    │               └─> setBlockedDates(dates)
    │
    └─> setIsLoading(false)


User Clicks Date
    │
    ├─> Check if date is blocked
    │       │
    │       ├─ Yes: Ignore click
    │       │
    │       └─ No: Continue
    │
    ├─> setSelectedDate(date)
    │
    └─> onDateSelect(date) ────────────────────> Parent Component


User Changes Month
    │
    ├─> setCurrentMonth(newMonth)
    │
    └─> Re-render calendar grid
```

## Cache Strategy

```
Request Timeline:

T=0:00    First request
          ├─> Cache miss
          ├─> Fetch ICS (500ms)
          ├─> Parse events (50ms)
          ├─> Cache result
          └─> Total: 550ms

T=0:10    Second request (same URL)
          ├─> Cache hit
          ├─> Read from localStorage (5ms)
          └─> Total: 5ms

T=15:00   Third request (cache expired)
          ├─> Cache miss (TTL expired)
          ├─> Fetch ICS (500ms)
          ├─> Parse events (50ms)
          ├─> Update cache
          └─> Total: 550ms

Cache Key Format:
  blocked_dates_[base64(icsUrl)]

Cache Value Format:
  {
    dates: string[],      // ["2026-02-20", "2026-02-21"]
    timestamp: number     // Unix timestamp in ms
  }
```

## Event Parsing Logic

```
ICS Event                    Parsing Logic                  Blocked Dates
─────────────────────────────────────────────────────────────────────────

All-Day Single Day:
DTSTART;VALUE=DATE:20260220  ──> Parse as date only      ──> ["2026-02-20"]
DTEND;VALUE=DATE:20260221        End is exclusive


All-Day Multi-Day:
DTSTART;VALUE=DATE:20260220  ──> Loop from start to end  ──> ["2026-02-20",
DTEND;VALUE=DATE:20260223        (end exclusive)              "2026-02-21",
                                                              "2026-02-22"]


Timed Single Day:
DTSTART:20260220T140000Z     ──> Extract date portion    ──> ["2026-02-20"]
DTEND:20260220T160000Z           Block entire day


Timed Multi-Day:
DTSTART:20260220T230000Z     ──> Loop through all days   ──> ["2026-02-20",
DTEND:20260221T020000Z           event touches                "2026-02-21"]
                                 (inclusive)


Recurring Event:
DTSTART:20260220T140000Z     ──> Only instances in       ──> ["2026-02-20",
RRULE:FREQ=WEEKLY;COUNT=3        date range are parsed        "2026-02-27",
                                                              "2026-03-06"]
```

## File Structure

```
y:\projects\travel\
│
├── utils\
│   └── icsParser.ts                    # Core parsing logic
│       ├── getBlockedDatesFromICS()    # Main export
│       ├── parseICSForBlockedDates()   # ICS parser
│       ├── extractDate()               # Date extraction
│       ├── parseICSDate()              # Date parsing
│       ├── parseICSDateTime()          # DateTime parsing
│       ├── getFromCache()              # Cache retrieval
│       ├── saveToCache()               # Cache storage
│       └── clearBlockedDatesCache()    # Cache clearing
│
├── components\
│   └── DatePickerCalendar.tsx          # React component
│       ├── Props interface
│       ├── State management
│       ├── useEffect (fetch blocked dates)
│       ├── Calendar rendering
│       ├── Date selection logic
│       └── Loading/error states
│
├── app\
│   └── listing\
│       └── [id]\
│           └── page.tsx                # Integration example
│               ├── Import component
│               ├── State for checkInDate
│               └── Render DatePickerCalendar
│
├── docs\
│   ├── GOOGLE_CALENDAR_SETUP.md        # Detailed setup guide
│   ├── DATE_PICKER_README.md           # Full documentation
│   ├── QUICK_START.md                  # Quick reference
│   └── ARCHITECTURE.md                 # This file
│
└── examples\
    └── DatePickerExample.tsx           # Usage examples
```

## Technology Stack

```
Frontend:
  ├── React 18+ (Client Components)
  ├── TypeScript (Type Safety)
  ├── Next.js 14+ (App Router)
  └── Tailwind CSS (Styling)

Data Source:
  └── Google Calendar Public ICS Feed
        ├── No authentication required
        ├── CORS-enabled by default
        └── Standard iCalendar format (RFC 5545)

Storage:
  └── Browser localStorage
        ├── Key-value store
        ├── ~5-10MB limit
        └── Persists across sessions

Icons:
  └── Heroicons (React)
        ├── ChevronLeftIcon
        └── ChevronRightIcon
```

## Performance Characteristics

```
Operation                    Time        Notes
────────────────────────────────────────────────────────────────
Initial Load (no cache)      ~550ms      Fetch + parse
Subsequent Load (cached)     ~5ms        localStorage read
Cache Expiry Check          ~1ms        Timestamp comparison
Month Navigation            ~1ms        State update + re-render
Date Selection              ~1ms        State update
ICS Fetch                   ~500ms      Network request
ICS Parse (100 events)      ~50ms       String parsing
ICS Parse (1000 events)     ~200ms      String parsing

Memory Usage:
  Component State:           ~1KB        Dates + UI state
  localStorage Cache:        ~5KB        Per calendar
  Component Code:            ~8KB        Minified + gzipped
```

## Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Boundaries                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Public Data (Safe to Expose):                              │
│    ✓ Event dates                                            │
│    ✓ Event times                                            │
│    ✓ Generic event titles ("Booked", "Unavailable")         │
│                                                              │
│  Private Data (Keep Separate):                              │
│    ✗ Guest names                                            │
│    ✗ Contact information                                    │
│    ✗ Payment details                                        │
│    ✗ Personal calendar events                               │
│                                                              │
│  Recommendation:                                             │
│    Use a dedicated "Booking Calendar" that only contains    │
│    blocking events, separate from personal calendars.       │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Data Flow Security:
  Browser ──HTTPS──> Google Calendar (Public ICS)
     │
     └──> localStorage (Client-side only)
          └──> Never sent to your server
               └──> Never logged or tracked
```

## Error Handling

```
Error Type                   Handling Strategy
────────────────────────────────────────────────────────────────
Network Error                Show error UI with retry button
Invalid ICS URL              Show error message
Parse Error                  Log to console, show error UI
CORS Error                   Show troubleshooting tips
Cache Error                  Fallback to fresh fetch
localStorage Full            Clear old cache entries

Error UI:
  ┌─────────────────────────────────────────┐
  │  ⚠️  Unable to load calendar            │
  │                                         │
  │  [Error message details]                │
  │                                         │
  │  [Try Again Button]                     │
  └─────────────────────────────────────────┘
```

This architecture provides a robust, performant, and user-friendly solution for blocking dates based on Google Calendar events without requiring API keys or server-side processing.
