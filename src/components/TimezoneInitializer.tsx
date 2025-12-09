'use client';

import { ReactNode, useEffect } from 'react';
import { setUserTimezone } from '@/lib/shared/timezone.actions';
import { COOKIE } from '@/lib/const';

/**
 * A client-side helper to read a specific cookie value from document.cookie.
 * @returns The timezone string if found, otherwise null.
 */
function getClientTimezoneCookie(): string | null {
	const name = `${COOKIE.TIMEZONE}=`;

	try {
		const decodedCookie = decodeURIComponent(document.cookie);
		const ca = decodedCookie.split(';');

		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
	} catch (e) {
		// Handle potential errors (e.g., if document or cookie reading fails)
		console.error('Error reading client timezone cookie:', e);
	}

	return null;
}

export default function TimezoneInitializer(): ReactNode {
	useEffect(() => {
		// 1. Get the current local IANA timezone identifier
		const currentTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

		// 2. Check the existing cookie value
		const existingTimezone = getClientTimezoneCookie();

		// 3. Only call the server action if the timezone is new or different
		if (currentTimezone && currentTimezone !== existingTimezone) {
			// Call the server action to set the secure, HTTP-only cookie
			void setUserTimezone(currentTimezone);
		}
	}, []);

	// This component does not render any visible UI
	return null;
}
