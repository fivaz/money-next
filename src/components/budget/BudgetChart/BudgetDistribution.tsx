'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Budget } from '@/lib/budget/budget.model';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetDistributionProps {
	budgets: Budget[];
}

export default function BudgetDistribution({ budgets }: BudgetDistributionProps) {
	const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);

	const colors = budgets.map((_, index) => {
		const hue = (index * 360) / budgets.length; // Evenly spaced hues
		return `hsl(${hue}, 70%, 50%)`;
	});

	const data = {
		labels: budgets.map((budget) => budget.name),
		datasets: [
			{
				label: 'Budget ($)',
				data: budgets.map((budget) => budget.amount),
				backgroundColor: colors,
				borderColor: colors.map((color) => color.replace('50%', '40%')), // Slightly darker border
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Budget Distribution',
				font: { size: 18 },
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const value = Number(context.parsed);
						const percentage = ((value / totalAmount) * 100).toFixed(1);
						const formattedValue = (value / 100).toFixed(2);
						return `${context.label}: $${formattedValue} (${percentage}%)`;
					},
				},
			},
		},
	};

	return <Pie data={data} options={options} />;
}
