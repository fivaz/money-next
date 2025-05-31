export type Transaction = {
	id: string;
	description: string;
	createdAt?: string;
	referenceDate: string;
	date: string;
	amount: number;
	isPaid: boolean;
};
