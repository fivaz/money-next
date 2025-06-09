'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	BarElement,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

import { MonthlySummaryChartDataSet } from '@/components/transaction/MonthlySummaryChart/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type MonthlySummaryChartProps = {
	monthlySummary: MonthlySummaryChartDataSet;
};

export default function MonthlySummaryChart({ monthlySummary }: MonthlySummaryChartProps) {
	const data = {
		labels: monthlySummary.map((item) => item.time),
		datasets: [
			{
				label: 'Total',
				data: monthlySummary.map((item) => item.total),
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.2)',
				fill: true,
				tension: 0.4,
				pointRadius: 4,
				pointHoverRadius: 6,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Monthly Summary (May 2024 - June 2025)',
				font: { size: 18 },
			},
			tooltip: {
				callbacks: {
					label: (context: any) => {
						const value = context.parsed.y;
						const formattedValue = (value / 100).toFixed(2);
						return `${context.dataset.label}: $${formattedValue}`;
					},
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Month',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Total',
				},
				beginAtZero: true,
				ticks: {
					callback: (value: string | number) => {
						return `$${(Number(value) / 1000).toFixed(2)}`;
					},
				},
			},
		},
	};

	return <Line data={data} options={options} />;
}
