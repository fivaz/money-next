import { addMonths, format, isSameYear, subMonths } from "date-fns";
import { Button } from "../base/button"
import { atom, useAtom } from 'jotai';
import { Calendar1Icon, ChevronLeft } from "lucide-react";
import { useMemo, useRef } from 'react';

export const currentDateAtom = atom(new Date())


export default function DateSwitcher(){
	const [date, setDate] = useAtom(currentDateAtom)

	const dateInput = useRef<HTMLInputElement | null>(null) // Ref for the hidden input
	
	const formattedDate = useMemo(() => {
		if (isSameYear(date, new Date())) {
			// Same year as browser: show only month
			return format(date, 'MMMM') // e.g., "March"
		} else {
			// Different year: show month and year
			return format(date, 'MMMM, yyyy') // e.g., "March, 2025"
		}
	})

	const handlePrevMonth = () => {
		setDate((date) => subMonths(date, 1))
	}

	function handleNextMonth() {
		setDate((date) => addMonths(date, 1))
	}


	function showDatePicker() {
		if (dateInput.current) {
			dateInput.current.showPicker() // Trigger native date picker
		}
	}



	return (
		<div className="flex items-center justify-between gap-3 p-3">
		<Button onClick={handlePrevMonth}>
		<ChevronLeft className="size-7" />
	</Button>
	<div className="flex flex-col items-center">
		<div className="flex items-center justify-center gap-2">
			<Text size="xl">{ formattedDate }</Text>
			<Button size="p-1" className="focus:outline-none" onClick={showDatePicker}>
			<Calendar1Icon className="size-4 text-yellow-500 dark:text-yellow-400" aria-hidden="true" />
		</Button>
		<input
			ref="dateInput"
			type="date"
		:value="dateStore.getISODate()"
		@change="handleDateChange"
		className="pointer-events-none absolute opacity-0"
		/>
	</div>
	<div className="flex items-center gap-2">
		<Text>
			<NMoney className="text-sm">{{ expectedBalance }}</NMoney>
		</Text>
		<Text>
			( <NMoney :className="[balanceClass, 'text-sm']">{{ balanceDifference }} </NMoney> )
	</Text>
</div>
</div>
	<Button @click="dateStore.handleNextMonth">
		<ChevronRight className="size-7" />
		</Button>
</div>
)
}