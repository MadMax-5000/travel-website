"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getBlockedDatesFromICS } from '@/utils/icsParser';

interface DatePickerCalendarProps {
    /** Public Google Calendar ICS URL */
    icsUrl: string;
    /** Callback when a date is selected */
    onDateSelect?: (date: Date | null) => void;
    /** Initial selected date */
    initialDate?: Date | null;
    /** Minimum selectable date (defaults to today) */
    minDate?: Date;
    /** Maximum selectable date (defaults to 1 year from now) */
    maxDate?: Date;
}

export default function DatePickerCalendar({
    icsUrl,
    onDateSelect,
    initialDate = null,
    minDate = new Date(),
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
}: DatePickerCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blocked dates when component mounts or ICS URL changes
    useEffect(() => {
        let isMounted = true;

        async function fetchBlockedDates() {
            setIsLoading(true);
            setError(null);

            try {
                // Fetch blocked dates for a wider range (current month - 1 to + 13 months)
                const rangeStart = new Date(currentMonth);
                rangeStart.setMonth(rangeStart.getMonth() - 1);
                rangeStart.setDate(1);

                const rangeEnd = new Date(currentMonth);
                rangeEnd.setMonth(rangeEnd.getMonth() + 13);
                rangeEnd.setDate(0);

                const dates = await getBlockedDatesFromICS(icsUrl, rangeStart, rangeEnd);

                if (isMounted) {
                    setBlockedDates(new Set(dates));
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load availability');
                    setIsLoading(false);
                }
            }
        }

        fetchBlockedDates();

        return () => {
            isMounted = false;
        };
    }, [icsUrl, currentMonth]);

    // Generate calendar days for the current month
    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // Previous month's trailing days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const prevMonthDays = Array.from(
            { length: startingDayOfWeek },
            (_, i) => ({
                date: new Date(year, month - 1, prevMonthLastDay - startingDayOfWeek + i + 1),
                isCurrentMonth: false
            })
        );

        // Current month's days
        const currentMonthDays = Array.from(
            { length: daysInMonth },
            (_, i) => ({
                date: new Date(year, month, i + 1),
                isCurrentMonth: true
            })
        );

        // Next month's leading days
        const totalDays = prevMonthDays.length + currentMonthDays.length;
        const nextMonthDaysCount = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
        const nextMonthDays = Array.from(
            { length: nextMonthDaysCount },
            (_, i) => ({
                date: new Date(year, month + 1, i + 1),
                isCurrentMonth: false
            })
        );

        return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }, [currentMonth]);

    const handlePrevMonth = () => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return;

        const dateStr = formatDate(date);
        const isBlocked = blockedDates.has(dateStr);
        const isBeforeMin = date < minDate;
        const isAfterMax = date > maxDate;

        if (isBlocked || isBeforeMin || isAfterMax) return;

        setSelectedDate(date);
        onDateSelect?.(date);
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const isSameDay = (date1: Date | null, date2: Date): boolean => {
        if (!date1) return false;
        return formatDate(date1) === formatDate(date2);
    };

    const isDateDisabled = (date: Date): boolean => {
        const dateStr = formatDate(date);
        return (
            blockedDates.has(dateStr) ||
            date < minDate ||
            date > maxDate
        );
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <h4 className="text-red-900 dark:text-red-200 font-medium mb-2">
                    Unable to load calendar
                </h4>
                <p className="text-red-700 dark:text-red-300 text-sm">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-sm font-medium text-red-900 dark:text-red-200 underline underline-offset-2 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-3 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-neutral-100 rounded-full animate-spin" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Loading availability...
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        aria-label="Previous month"
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                    </button>

                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>

                    <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        aria-label="Next month"
                    >
                        <ChevronRightIcon className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                    </button>
                </div>

                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                        <div
                            key={day}
                            className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 py-2"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                        const isDisabled = isDateDisabled(day.date);
                        const isSelected = isSameDay(selectedDate, day.date);
                        const isToday = isSameDay(new Date(), day.date);

                        return (
                            <button
                                key={index}
                                onClick={() => handleDateClick(day.date, day.isCurrentMonth)}
                                disabled={isDisabled || !day.isCurrentMonth}
                                className={`
                  aspect-square p-2 rounded-lg text-sm font-medium transition-all
                  ${!day.isCurrentMonth ? 'text-neutral-300 dark:text-neutral-700 cursor-default' : ''}
                  ${day.isCurrentMonth && !isDisabled && !isSelected ? 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800' : ''}
                  ${isDisabled && day.isCurrentMonth ? 'text-neutral-300 dark:text-neutral-700 line-through cursor-not-allowed' : ''}
                  ${isSelected ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold' : ''}
                  ${isToday && !isSelected ? 'ring-2 ring-neutral-900 dark:ring-neutral-100 ring-inset' : ''}
                `}
                            >
                                {day.date.getDate()}
                            </button>
                        );
                    })}
                </div>

                {/* Selected date display */}
                {selectedDate && (
                    <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                            Selected check-in date:
                        </p>
                        <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            {selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                )}

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-neutral-900 dark:border-neutral-100" />
                        <span className="text-neutral-600 dark:text-neutral-400">Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-neutral-900 dark:bg-neutral-100" />
                        <span className="text-neutral-600 dark:text-neutral-400">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded text-neutral-300 dark:text-neutral-700 flex items-center justify-center text-[10px] line-through">
                            15
                        </div>
                        <span className="text-neutral-600 dark:text-neutral-400">Unavailable</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
