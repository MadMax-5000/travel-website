/**
 * Example usage of the DatePickerCalendar component
 * This file demonstrates various use cases and configurations
 */

"use client";

import { useState } from 'react';
import DatePickerCalendar from '@/components/DatePickerCalendar';

export default function DatePickerExample() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Example 1: Basic usage with a public Google Calendar
    const basicExample = (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Basic Example</h2>
            <DatePickerCalendar
                icsUrl="https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics"
                onDateSelect={(date) => {
                    setSelectedDate(date);
                    console.log('Selected date:', date);
                }}
            />
        </div>
    );

    // Example 2: With custom date range
    const customRangeExample = (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Custom Date Range</h2>
            <DatePickerCalendar
                icsUrl="https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics"
                onDateSelect={setSelectedDate}
                minDate={new Date()} // Today
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))} // 6 months from now
            />
        </div>
    );

    // Example 3: With initial date
    const initialDateExample = (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">With Initial Date</h2>
            <DatePickerCalendar
                icsUrl="https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics"
                onDateSelect={setSelectedDate}
                initialDate={new Date(new Date().setDate(new Date().getDate() + 7))} // 7 days from now
            />
        </div>
    );

    // Example 4: Integration with form
    const formExample = (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Form Integration</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (selectedDate) {
                    alert(`Booking for: ${selectedDate.toLocaleDateString()}`);
                } else {
                    alert('Please select a date');
                }
            }}>
                <DatePickerCalendar
                    icsUrl="https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics"
                    onDateSelect={setSelectedDate}
                />

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-3 rounded-lg font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );

    // Example 5: Multiple calendars (advanced)
    const multipleCalendarsExample = (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Multiple Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Property A</h3>
                    <DatePickerCalendar
                        icsUrl="https://calendar.google.com/calendar/ical/CALENDAR_A_ID/public/basic.ics"
                        onDateSelect={(date) => console.log('Property A:', date)}
                    />
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Property B</h3>
                    <DatePickerCalendar
                        icsUrl="https://calendar.google.com/calendar/ical/CALENDAR_B_ID/public/basic.ics"
                        onDateSelect={(date) => console.log('Property B:', date)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto py-12 space-y-16">
            {basicExample}
            {customRangeExample}
            {initialDateExample}
            {formExample}
            {multipleCalendarsExample}
        </div>
    );
}

/**
 * TESTING TIPS:
 * 
 * 1. Create test events in your Google Calendar:
 *    - All-day event for tomorrow
 *    - Multi-day event next week
 *    - Timed event (e.g., 2 PM - 4 PM)
 * 
 * 2. Verify blocked dates appear correctly:
 *    - Should show with strikethrough
 *    - Should not be clickable
 * 
 * 3. Test caching:
 *    - Open browser DevTools > Application > Local Storage
 *    - Look for keys starting with "blocked_dates_"
 *    - Verify cache expires after 15 minutes
 * 
 * 4. Test error handling:
 *    - Use an invalid ICS URL
 *    - Verify error message displays
 *    - Check "Try again" button works
 * 
 * 5. Test loading states:
 *    - Clear cache and reload
 *    - Verify loading spinner appears
 *    - Check smooth transition to calendar
 */
