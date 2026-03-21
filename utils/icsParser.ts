/**
 * Utility functions for fetching and parsing Google Calendar ICS files
 * to extract blocked dates for booking systems.
 */

interface CachedBlockedDates {
    dates: string[];
    timestamp: number;
}

const CACHE_KEY_PREFIX = 'blocked_dates_';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Fetches and parses an ICS file to extract blocked dates.
 * Results are cached in localStorage with a TTL.
 * 
 * @param icsUrl - Public Google Calendar ICS URL
 * @param start - Start date for the range to check
 * @param end - End date for the range to check
 * @returns Array of blocked dates in YYYY-MM-DD format
 */
export async function getBlockedDatesFromICS(
    icsUrl: string,
    start: Date,
    end: Date
): Promise<string[]> {
    // Demo mode for testing without a real calendar
    if (icsUrl === 'DEMO_MODE') {
        return getDemoBlockedDates(start, end);
    }

    const cacheKey = `${CACHE_KEY_PREFIX}${btoa(icsUrl)}`;

    // Check cache first
    const cached = getFromCache(cacheKey);
    if (cached) {
        return filterDatesByRange(cached, start, end);
    }

    try {
        // Fetch the ICS file with CORS mode
        const response = await fetch(icsUrl, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'text/calendar, text/plain, */*',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ICS (${response.status}): ${response.statusText}`);
        }

        const icsText = await response.text();

        // Validate that we got ICS content
        if (!icsText.includes('BEGIN:VCALENDAR')) {
            throw new Error('Invalid ICS format: Missing VCALENDAR');
        }

        // Parse the ICS and extract blocked dates
        const blockedDates = parseICSForBlockedDates(icsText);

        // Cache the result
        saveToCache(cacheKey, blockedDates);

        // Return filtered dates within the requested range
        return filterDatesByRange(blockedDates, start, end);
    } catch (error) {
        console.error('Error fetching or parsing ICS:', error);
        throw error;
    }
}

/**
 * Parses ICS text content and extracts all dates that have events.
 * Supports both all-day events and timed events.
 * 
 * @param icsText - Raw ICS file content
 * @returns Array of dates in YYYY-MM-DD format
 */
function parseICSForBlockedDates(icsText: string): string[] {
    const blockedDates = new Set<string>();

    // Split into events (VEVENT blocks)
    const events = icsText.split('BEGIN:VEVENT');

    for (let i = 1; i < events.length; i++) {
        const event = events[i];
        const endIndex = event.indexOf('END:VEVENT');
        if (endIndex === -1) continue;

        const eventContent = event.substring(0, endIndex);

        // Extract DTSTART and DTEND
        const dtstart = extractDate(eventContent, 'DTSTART');
        const dtend = extractDate(eventContent, 'DTEND');

        if (dtstart) {
            // For all-day events or single-day events
            if (isAllDayEvent(eventContent)) {
                // All-day events: block from start to end (exclusive)
                const startDate = parseICSDate(dtstart);
                const endDate = dtend ? parseICSDate(dtend) : startDate;

                // Add all dates in the range (end is exclusive for all-day events)
                let currentDate = new Date(startDate);
                const finalDate = new Date(endDate);

                while (currentDate < finalDate) {
                    blockedDates.add(formatDate(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            } else {
                // Timed events: block the day(s) the event occurs on
                const startDate = parseICSDateTime(dtstart);
                const endDate = dtend ? parseICSDateTime(dtend) : startDate;

                // Block all days from start to end (inclusive)
                let currentDate = new Date(startDate);
                currentDate.setHours(0, 0, 0, 0);
                const finalDate = new Date(endDate);
                finalDate.setHours(0, 0, 0, 0);

                while (currentDate <= finalDate) {
                    blockedDates.add(formatDate(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }
        }
    }

    return Array.from(blockedDates).sort();
}

/**
 * Extracts a date field value from ICS event content
 */
function extractDate(eventContent: string, fieldName: string): string | null {
    // Match both simple and parameterized date fields
    // e.g., DTSTART:20240101 or DTSTART;VALUE=DATE:20240101
    const regex = new RegExp(`${fieldName}[^:]*:([^\\r\\n]+)`, 'i');
    const match = eventContent.match(regex);
    return match ? match[1].trim() : null;
}

/**
 * Checks if an event is an all-day event
 */
function isAllDayEvent(eventContent: string): boolean {
    // All-day events typically have VALUE=DATE parameter or date-only format
    return /DTSTART[^:]*;VALUE=DATE:/i.test(eventContent) ||
        /DTSTART:(\d{8})(?:\r|\n)/i.test(eventContent);
}

/**
 * Parses ICS date format (YYYYMMDD) to Date object
 */
function parseICSDate(dateStr: string): Date {
    // Remove any timezone or time information
    const dateOnly = dateStr.replace(/[TZ].*/g, '');
    const year = parseInt(dateOnly.substring(0, 4), 10);
    const month = parseInt(dateOnly.substring(4, 6), 10) - 1; // JS months are 0-indexed
    const day = parseInt(dateOnly.substring(6, 8), 10);
    return new Date(year, month, day);
}

/**
 * Parses ICS datetime format (YYYYMMDDTHHmmss or YYYYMMDDTHHmmssZ) to Date object
 */
function parseICSDateTime(dateTimeStr: string): Date {
    const isUTC = dateTimeStr.endsWith('Z');
    const cleanStr = dateTimeStr.replace(/[Z]/g, '');

    const year = parseInt(cleanStr.substring(0, 4), 10);
    const month = parseInt(cleanStr.substring(4, 6), 10) - 1;
    const day = parseInt(cleanStr.substring(6, 8), 10);

    if (cleanStr.length >= 15) {
        const hour = parseInt(cleanStr.substring(9, 11), 10);
        const minute = parseInt(cleanStr.substring(11, 13), 10);
        const second = parseInt(cleanStr.substring(13, 15), 10);

        if (isUTC) {
            return new Date(Date.UTC(year, month, day, hour, minute, second));
        } else {
            return new Date(year, month, day, hour, minute, second);
        }
    }

    return new Date(year, month, day);
}

/**
 * Formats a Date object to YYYY-MM-DD
 */
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Filters dates to only include those within the specified range
 */
function filterDatesByRange(dates: string[], start: Date, end: Date): string[] {
    const startStr = formatDate(start);
    const endStr = formatDate(end);

    return dates.filter(date => date >= startStr && date <= endStr);
}

/**
 * Retrieves cached blocked dates if still valid
 */
function getFromCache(key: string): string[] | null {
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const data: CachedBlockedDates = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - data.timestamp < CACHE_TTL_MS) {
            return data.dates;
        }

        // Cache expired, remove it
        localStorage.removeItem(key);
        return null;
    } catch (error) {
        console.error('Error reading from cache:', error);
        return null;
    }
}

/**
 * Saves blocked dates to cache with timestamp
 */
function saveToCache(key: string, dates: string[]): void {
    if (typeof window === 'undefined') return;

    try {
        const data: CachedBlockedDates = {
            dates,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to cache:', error);
    }
}

/**
 * Generates demo blocked dates for testing without a real calendar
 */
function getDemoBlockedDates(start: Date, end: Date): Promise<string[]> {
    const blockedDates: string[] = [];
    const today = new Date();

    // Block some dates for demo purposes
    // Block tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    blockedDates.push(formatDate(tomorrow));

    // Block 5 days from now
    const fiveDays = new Date(today);
    fiveDays.setDate(fiveDays.getDate() + 5);
    blockedDates.push(formatDate(fiveDays));

    // Block a range: 10-12 days from now
    for (let i = 10; i <= 12; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        blockedDates.push(formatDate(date));
    }

    // Block 20 days from now
    const twentyDays = new Date(today);
    twentyDays.setDate(twentyDays.getDate() + 20);
    blockedDates.push(formatDate(twentyDays));

    // Filter by requested range
    const filtered = filterDatesByRange(blockedDates, start, end);

    // Return as a resolved promise to match the async signature
    return Promise.resolve(filtered);
}

/**
 * Clears all cached blocked dates
 */
export function clearBlockedDatesCache(): void {
    if (typeof window === 'undefined') return;

    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(CACHE_KEY_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
}
