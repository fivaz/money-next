'use client';

import * as React from 'react';
import { AuthContext } from './AuthContext';
import { User } from '@/lib/user/user.model';

export interface AuthProviderProps {
	user: User | null;
	children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {
	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
