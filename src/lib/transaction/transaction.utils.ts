import { Transaction } from '@/lib/transaction/transaction.model';

export function buildTransaction(id: number, formData: FormData): Transaction {
	return {
		id,
		description: formData.get('description') as string,
		amount: parseFloat(formData.get('amount') as string),
		date: formData.get('date') as string,
		isPaid: formData.get('isPaid') === 'on',
		referenceDate: formData.get('referenceDate') as string,
	};
}
