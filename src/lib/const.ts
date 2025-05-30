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

export const navLinks: { name: string; path: string }[] = [
	ROUTES.ROOT,
	ROUTES.BUDGETS,
	ROUTES.SOURCES,
];
