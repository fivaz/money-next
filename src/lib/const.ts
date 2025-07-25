export const ROUTES = {
	ROOT: {
		name: 'Transactions',
		path: '/',
	},
	BUDGETS: {
		name: 'Budgets',
		path: '/budgets',
	},
	SOURCES: {
		name: 'Sources',
		path: '/sources',
	},
	RECAP: {
		name: 'Recap',
		path: '/recap',
	},
	PROFILE: {
		name: 'Profile',
		path: '/profile',
	},
	LOGIN: {
		name: 'Login',
		path: '/login',
	},
	REGISTER: {
		name: 'Register',
		path: '/register',
	},
};

export const navLinks = [ROUTES.ROOT, ROUTES.BUDGETS, ROUTES.SOURCES, ROUTES.RECAP];

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export const API = {
	TRANSACTIONS: 'transactions',
	BUDGETS: 'budgets',
	SOURCES: 'sources',
};
