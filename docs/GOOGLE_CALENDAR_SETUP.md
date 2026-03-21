# Google Calendar Integration Guide

This guide explains how to set up your Google Calendar to work with the date picker component for blocking unavailable dates.

## Overview

The date picker component uses a **public Google Calendar ICS feed** to determine which dates are unavailable. This approach:
- ✅ **No API keys required** - Uses public calendar feeds
- ✅ **Works in static builds** - Fetches data client-side
- ✅ **Automatic caching** - Results cached in localStorage for 15 minutes
- ✅ **Supports all event types** - Both all-day and timed events

## How to Get Your Public Google Calendar ICS URL

### Step 1: Create or Select a Calendar

1. Go to [Google Calendar](https://calendar.google.com)
2. Either use an existing calendar or create a new one:
   - Click the **+** button next to "Other calendars"
   - Select **"Create new calendar"**
   - Name it (e.g., "Property Bookings")
   - Click **"Create calendar"**

### Step 2: Make the Calendar Public

1. In the left sidebar, find your calendar under "My calendars"
2. Hover over the calendar name and click the **three dots (⋮)**
3. Select **"Settings and sharing"**
4. Scroll down to **"Access permissions for events"**
5. Check the box: **"Make available to public"**
   - ⚠️ **Important**: Only enable this for calendars that don't contain sensitive information
   - Consider creating a dedicated calendar just for blocking dates

### Step 3: Get the ICS URL

1. While still in calendar settings, scroll down to **"Integrate calendar"**
2. Find the section labeled **"Public URL to this calendar"**
3. Look for the **iCal format** link (it ends with `.ics`)
4. Copy the entire URL - it should look like:
   ```
   https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics
   ```

### Step 4: Use the URL in Your Code

Replace the placeholder URL in your listing page:

```tsx
<DatePickerCalendar
  icsUrl="https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics"
  onDateSelect={(date) => setCheckInDate(date)}
  initialDate={checkInDate}
/>
```

## Required Calendar Sharing Settings

For the integration to work properly, ensure:

1. **Public Access**: Calendar must be set to "Make available to public"
2. **Event Details**: Set to "See all event details" (default when making public)
3. **No Authentication**: The ICS URL should be accessible without login

## How It Works

### Event Blocking Logic

- **All-day events**: Block the entire day(s) the event spans
- **Timed events**: Block any day the event occurs on (even partially)
- **Multi-day events**: All days from start to end are blocked

### Examples

| Event Type | Start | End | Blocked Dates |
|------------|-------|-----|---------------|
| All-day | Jan 15 | Jan 15 | Jan 15 |
| All-day (multi) | Jan 15 | Jan 17 | Jan 15, Jan 16 |
| Timed | Jan 15 2:00 PM | Jan 15 4:00 PM | Jan 15 |
| Timed (overnight) | Jan 15 11:00 PM | Jan 16 2:00 AM | Jan 15, Jan 16 |

### Caching Behavior

- **Cache Duration**: 15 minutes (configurable in `utils/icsParser.ts`)
- **Storage**: Browser localStorage
- **Cache Key**: Based on the ICS URL (hashed)
- **Automatic Refresh**: Cache expires after TTL, then refetches

To clear the cache manually:

```typescript
import { clearBlockedDatesCache } from '@/utils/icsParser';

clearBlockedDatesCache();
```

## Testing Your Setup

### 1. Verify the ICS URL Works

Open the ICS URL directly in your browser. You should see raw calendar data like:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
...
BEGIN:VEVENT
DTSTART:20260220
DTEND:20260221
SUMMARY:Blocked Date
...
END:VEVENT
...
END:VCALENDAR
```

### 2. Add Test Events

1. Create a few test events in your calendar:
   - One all-day event for tomorrow
   - One timed event for next week
   - One multi-day event
2. Refresh your listing page
3. Verify those dates appear as unavailable (crossed out) in the calendar

### 3. Check Browser Console

Open browser DevTools (F12) and check the Console tab:
- Look for any error messages
- Verify the ICS fetch is successful
- Check that dates are being parsed correctly

## Troubleshooting

### Calendar Not Loading

**Problem**: "Unable to load calendar" error appears

**Solutions**:
1. Verify the ICS URL is correct and accessible
2. Check that the calendar is set to public
3. Open the ICS URL in a browser to verify it returns data
4. Check browser console for CORS or network errors

### Dates Not Blocking

**Problem**: Events exist but dates aren't blocked

**Solutions**:
1. Clear the cache: `localStorage.clear()` in browser console
2. Verify events are in the future (past events are ignored by date range)
3. Check that events have valid DTSTART dates
4. Ensure the calendar is actually public (try accessing ICS URL in incognito mode)

### CORS Errors

**Problem**: Browser blocks the ICS fetch due to CORS

**Solution**: Google Calendar ICS feeds should allow CORS by default. If you see CORS errors:
1. Verify you're using the correct public ICS URL (not the private one)
2. Try accessing the URL in a new incognito window
3. Check if your browser has strict privacy settings blocking third-party requests

### Cache Not Updating

**Problem**: New events don't appear in the calendar

**Solutions**:
1. Wait 15 minutes for cache to expire, or
2. Clear localStorage: `localStorage.clear()` in browser console, or
3. Use the clear cache function:
   ```typescript
   import { clearBlockedDatesCache } from '@/utils/icsParser';
   clearBlockedDatesCache();
   ```

## Security Considerations

### What to Share

✅ **Safe to make public**:
- Blocked dates (no details needed)
- Generic "Booked" or "Unavailable" events
- Dates without sensitive information

❌ **Do NOT make public**:
- Personal calendars with private information
- Calendars with guest names, addresses, or contact info
- Any calendar with sensitive business data

### Best Practice

Create a **dedicated calendar** just for blocking dates:
1. Create a new calendar called "Property Availability" or similar
2. Only add blocking events to this calendar (e.g., "Booked", "Unavailable")
3. Make only this calendar public
4. Keep your personal calendar private

## Advanced Configuration

### Adjusting Cache Duration

Edit `utils/icsParser.ts`:

```typescript
const CACHE_TTL_MS = 15 * 60 * 1000; // Change to desired duration
```

Examples:
- 5 minutes: `5 * 60 * 1000`
- 1 hour: `60 * 60 * 1000`
- 1 day: `24 * 60 * 60 * 1000`

### Customizing Date Range

The component fetches dates for a 14-month window by default. To change this, edit `components/DatePickerCalendar.tsx`:

```typescript
// Current: -1 to +13 months
const rangeStart = new Date(currentMonth);
rangeStart.setMonth(rangeStart.getMonth() - 1);

const rangeEnd = new Date(currentMonth);
rangeEnd.setMonth(rangeEnd.getMonth() + 13);
```

### Multiple Calendars

To block dates from multiple calendars, you can:

1. **Option A**: Merge calendars in Google Calendar
   - Create a new calendar
   - Import events from multiple sources

2. **Option B**: Modify the component to accept multiple URLs
   ```typescript
   const [blockedDates1, blockedDates2] = await Promise.all([
     getBlockedDatesFromICS(url1, start, end),
     getBlockedDatesFromICS(url2, start, end)
   ]);
   const allBlocked = new Set([...blockedDates1, ...blockedDates2]);
   ```

## API Reference

### `getBlockedDatesFromICS()`

```typescript
async function getBlockedDatesFromICS(
  icsUrl: string,
  start: Date,
  end: Date
): Promise<string[]>
```

**Parameters**:
- `icsUrl`: Public Google Calendar ICS URL
- `start`: Start of date range to check
- `end`: End of date range to check

**Returns**: Array of blocked dates in `YYYY-MM-DD` format

**Throws**: Error if fetch fails or ICS parsing fails

### `clearBlockedDatesCache()`

```typescript
function clearBlockedDatesCache(): void
```

Clears all cached blocked dates from localStorage.

## Component Props

### `DatePickerCalendar`

```typescript
interface DatePickerCalendarProps {
  icsUrl: string;              // Required: Public Google Calendar ICS URL
  onDateSelect?: (date: Date | null) => void;  // Optional: Callback when date selected
  initialDate?: Date | null;   // Optional: Initially selected date
  minDate?: Date;              // Optional: Minimum selectable date (default: today)
  maxDate?: Date;              // Optional: Maximum selectable date (default: 1 year)
}
```

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your Google Calendar settings
3. Test the ICS URL directly in a browser
4. Check browser console for errors
5. Ensure you're using a modern browser with localStorage support

## Additional Resources

- [Google Calendar Help - Share your calendar](https://support.google.com/calendar/answer/37083)
- [iCalendar Format Specification (RFC 5545)](https://tools.ietf.org/html/rfc5545)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
