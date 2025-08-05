'use client';

import { useContext } from 'react';
import { AccountListContext } from './AccountListProvider';

export function useAccountList() {
	const context = useContext(AccountListContext);
	if (!context) {
		throw new Error('useAccountList must be used within an AccountListProvider');
	}
	return context;
}
