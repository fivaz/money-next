'use client';
import { PropsWithChildren } from 'react';
import { useAuthTokenRefresher } from '@/lib/user/token-refresh.hook';
import { useUser } from '@/lib/user/user.hook';

type ClientWrapperProps = PropsWithChildren;

export default function ClientWrapper({ children }: ClientWrapperProps) {
	useAuthTokenRefresher();
	useUser();
	return <>{children}</>;
}
