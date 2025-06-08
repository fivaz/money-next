import { createContext, useContext } from 'react';
import { User } from '@/lib/user/user.model';

export interface AuthContextValue {
	user: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
	user: null,
});

export const useAuth = () => useContext(AuthContext);
