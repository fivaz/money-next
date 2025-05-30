'use client';
import { PropsWithChildren } from 'react';
import { useAuthTokenRefresher } from '@/lib/user/user.utils';

type ClientWrapperProps = PropsWithChildren;

export default function ClientWrapper({ children }: ClientWrapperProps) {
	useAuthTokenRefresher();
	return <>{children}</>;
}
