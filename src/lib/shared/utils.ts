import { BACKEND_URL } from '@/lib/const';

export const formatMoney = (moneyInCents: number) => (Math.abs(moneyInCents) / 100).toFixed(2);
