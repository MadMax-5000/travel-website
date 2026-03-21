# Quick Reference: Date Picker Setup

## 🎯 In 3 Steps

### 1️⃣ Get Google Calendar ICS URL

1. Go to [Google Calendar](https://calendar.google.com)
2. Select calendar → ⋮ → **Settings and sharing**
3. Check **"Make available to public"**
4. Copy **Public URL (iCal format)**

### 2️⃣ Update Your Code

In `app/listing/[id]/page.tsx`, replace:

```tsx
icsUrl="https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics"
```

With your actual ICS URL.

### 3️⃣ Add Events to Block Dates

Create events in your Google Calendar:
- All-day event = blocks that day
- Multi-day event = blocks all days
- Timed event = blocks the day(s) it occurs

## ✅ Verify It Works

1. Create a test event for tomorrow
2. Refresh your listing page
3. Tomorrow should show as unavailable (strikethrough)

## 🔧 Common Issues

| Problem | Solution |
|---------|----------|
| Calendar not loading | Check ICS URL is correct and calendar is public |
| Dates not blocking | Clear cache: `localStorage.clear()` in browser console |
| CORS error | Verify using public ICS URL (not private) |

## 📁 Files Created

- ✅ `utils/icsParser.ts` - ICS parsing logic
- ✅ `components/DatePickerCalendar.tsx` - Calendar component
- ✅ `app/listing/[id]/page.tsx` - Updated with calendar
- ✅ `docs/GOOGLE_CALENDAR_SETUP.md` - Full setup guide
- ✅ `docs/DATE_PICKER_README.md` - Complete documentation
- ✅ `examples/DatePickerExample.tsx` - Usage examples

## 🎨 Features

- ✅ No API keys required
- ✅ Works with static builds
- ✅ 15-minute cache
- ✅ Dark mode support
- ✅ Loading & error states
- ✅ Mobile responsive

## 📖 Full Documentation

See `docs/GOOGLE_CALENDAR_SETUP.md` for detailed instructions.

## 🚀 You're Done!

Just replace the ICS URL and you're ready to go!
