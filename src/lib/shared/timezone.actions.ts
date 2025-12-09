'use server';

import { cookies } from 'next/headers';
import { COOKIE } from '@/lib/const';

/**
 * Sets the user's IANA timezone identifier into a secure, HTTP-only cookie.
 * @param timezone The IANA timezone string (e.g., "America/New_York").
 */
export async function setUserTimezone(timezone: string): Promise<void> {
	if (!timezone) {
		console.error('Timezone not provided.');
		return;
	}

	// Set the secure, HTTP-only cookie using next/headers cookies()
	const cookieStore = await cookies();
	cookieStore.set(COOKIE.TIMEZONE, timezone);
}
