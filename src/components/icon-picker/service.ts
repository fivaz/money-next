import {
	ShoppingCart,
	HandCoins,
	Ambulance,
	ReceiptText,
	Home,
	Gift,
	Banknote,
	Wallet,
	Wrench,
	HandHeart,
	CalendarFold,
	Landmark,
	Dumbbell,
	PlugZap,
	Laptop,
	Globe,
	Stethoscope,
	TriangleAlert,
	FireExtinguisher,
	ScanIcon,
	Car,
	Bus,
	Popcorn,
	Music,
	Lightbulb,
	BookOpen,
	Tag,
	PiggyBank,
	Shirt,
	Heart,
	Wifi,
	Smartphone,
	Package,
	Tablets,
} from 'lucide-react';
import { ComponentType } from 'react';

export const iconComponents = {
	'shopping-cart': ShoppingCart,
	'money coins': HandCoins,
	'heath ambulance': Ambulance,
	'receipt-text': ReceiptText,
	home: Home,
	'fun gift': Gift,
	money: Banknote,
	wallet: Wallet,
	'wrench setting repair': Wrench,
	'heart love give': HandHeart,
	'calendar year': CalendarFold,
	bank: Landmark,
	gym: Dumbbell,
	electricity: PlugZap,
	computer: Laptop,
	internet: Globe,
	heath: Stethoscope,
	accident: TriangleAlert,
	fire: FireExtinguisher,
	empty: ScanIcon,
	'car transport': Car,
	'bus transport': Bus,
	'entertainment popcorn': Popcorn,
	'entertainment music': Music,
	'utility lightbulb': Lightbulb,
	'education book': BookOpen,
	'miscellaneous tag': Tag,
	'savings piggy bank': PiggyBank,
	'clothes shirt': Shirt,
	heart: Heart,
	'wifi internet': Wifi,
	'smartphone internet': Smartphone,
	'box package': Package,
	'drug pill medicine': Tablets,
} as const;

type IconName = keyof typeof iconComponents;

// Define the getIcon function with string parameter and type guard
export function getIcon(name: string = 'empty'): ComponentType {
	// Type guard to check if name is a valid key
	if (name in iconComponents) {
		return iconComponents[name as IconName];
	}
	return iconComponents['empty'];
}
