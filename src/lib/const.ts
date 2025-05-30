export const ROUTES = {
	ROOT: {
		name: 'Accounts',
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

export const navLinks = [ROUTES.ROOT, ROUTES.BUDGETS, ROUTES.SOURCES];

export const profileLinks = [ROUTES.PROFILE];

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';
