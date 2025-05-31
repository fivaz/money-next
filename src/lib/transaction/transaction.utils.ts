import { Transaction } from '@/lib/transaction/transaction.model';

export function buildTransaction(formData: FormData): Transaction {
	return {
		id: Number(formData.get('id')),
		description: formData.get('description') as string,
		amount: parseInt(formData.get('amount') as string),
		date: formData.get('date') as string,
		isPaid: formData.get('isPaid') === 'on',
		referenceDate: formData.get('referenceDate') as string,
	};
}
