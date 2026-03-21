# ⚠️ IMPORTANT: Google Calendar Setup for Personal Gmail

## The Problem

If you're seeing "Failed to fetch" errors, it's likely because you're trying to use your **personal Gmail calendar** (`yourname@gmail.com`). 

**Personal Gmail calendars cannot be made fully public** and don't provide accessible public ICS feeds.

## The Solution

You have **3 options**:

### Option 1: Create a Dedicated Google Calendar (Recommended)

1. **Go to Google Calendar** (calendar.google.com)
2. **Create a new calendar**:
   - Click the **+** next to "Other calendars"
   - Select **"Create new calendar"**
   - Name it: "Property Availability" or "Booking Calendar"
   - Click **"Create calendar"**

3. **Make it public**:
   - Find your new calendar in the left sidebar
   - Click the **three dots (⋮)** → **Settings and sharing**
   - Scroll to **"Access permissions for events"**
   - Check ☑️ **"Make available to public"**
   - ⚠️ Make sure it says "See all event details"

4. **Get the ICS URL**:
   - Still in settings, scroll to **"Integrate calendar"**
   - Find **"Public URL to this calendar"** section
   - Copy the **iCal format** URL (ends with `.ics`)
   - It should look like:
     ```
     https://calendar.google.com/calendar/ical/LONG_CALENDAR_ID_HERE/public/basic.ics
     ```
   - **NOT** like: `https://calendar.google.com/calendar/ical/yourname@gmail.com/public/basic.ics`

5. **Add test events**:
   - In this new calendar, create events for dates you want to block
   - Example: "Booked", "Unavailable", etc.

### Option 2: Use Demo Mode (For Testing)

If you just want to test the calendar functionality without setting up Google Calendar, use the demo mode:

```tsx
<DatePickerCalendar
  icsUrl="DEMO_MODE"  // Special demo mode
  onDateSelect={(date) => setCheckInDate(date)}
  initialDate={checkInDate}
/>
```

This will show a working calendar with some pre-blocked demo dates.

### Option 3: Use a Third-Party Calendar Service

If Google Calendar doesn't work for you, consider:
- **Calendly** - Provides public ICS feeds
- **Outlook.com** - Can create public calendars
- **iCloud Calendar** - Can share calendars publicly

## Why Your Current URL Doesn't Work

```
❌ https://calendar.google.com/calendar/ical/yassirhannaoui333%40gmail.com/public/basic.ics
```

This URL format is for your **personal Gmail calendar**, which:
- Cannot be made truly public (Google security restriction)
- Requires authentication to access
- Will always return "Failed to fetch" or CORS errors

## What the Correct URL Looks Like

```
✅ https://calendar.google.com/calendar/ical/c_1234567890abcdef@group.calendar.google.com/public/basic.ics
```

Notice the difference:
- ✅ Has a long random ID
- ✅ Ends with `@group.calendar.google.com`
- ❌ NOT your email address

## Testing Your Setup

1. **Copy your ICS URL**
2. **Open it in a new browser tab** (incognito mode)
3. **You should see**:
   ```
   BEGIN:VCALENDAR
   VERSION:2.0
   PRODID:-//Google Inc//Google Calendar 70.9054//EN
   ...
   ```

4. **If you see**:
   - Login page → Calendar is not public
   - 404 error → URL is wrong
   - Nothing downloads → Calendar is not public

## Quick Fix Right Now

**Replace your current URL** in `ListingPageClient.tsx` line 314:

```tsx
// ❌ Current (doesn't work)
icsUrl="https://calendar.google.com/calendar/ical/yassirhannaoui333%40gmail.com/public/basic.ics"

// ✅ Option 1: Use demo mode for testing
icsUrl="DEMO_MODE"

// ✅ Option 2: Use your new public calendar URL (after creating it)
icsUrl="https://calendar.google.com/calendar/ical/YOUR_NEW_CALENDAR_ID/public/basic.ics"
```

## Still Having Issues?

1. **Check browser console** (F12) for detailed error messages
2. **Verify calendar is public** by opening the ICS URL in incognito mode
3. **Make sure** you're using a calendar you created, not your personal Gmail calendar
4. **Try demo mode** first to verify everything else works

## Security Note

⚠️ **Never make your personal Gmail calendar public!** It contains private information.

Always create a separate calendar just for blocking dates.
