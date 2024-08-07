import React, { useContext } from "react";
import { CalendarContext } from "../../../context/CalendarContext";
import { Stock } from "../../../interfaces/Stock";
import CalendarCell from "../../../atoms/calendar/calendarCell/CalendarCell";

type CalendarEditableCellProps = {
    stock: Stock,
    text: string,
}

const CalendarEditableCell: React.FC<CalendarEditableCellProps> = ({
    stock,
    text,
}) => {
    const { stocks, setStocks } = useContext(CalendarContext);

    const changeAmount = (value: number) => {
        const updatedStocks = [...stocks].map(s => s.ticker !== stock.ticker ? s : { ...s, amount: value });
        setStocks(updatedStocks)
    }

    return (
        <CalendarCell>
            <input value={text} onChange={(e) => changeAmount(+e.target.value)} />
        </CalendarCell>
    )
}

export default CalendarEditableCell;