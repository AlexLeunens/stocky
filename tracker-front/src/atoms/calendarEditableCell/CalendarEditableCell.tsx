import React, { useContext } from "react";
import "./CalendarEditableCell.scss";
import { CalendarContext } from "../../context/CalendarContext";
import { Stock } from "../../interfaces/Stock";

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
        <div className="calendar-cell">
            <input value={text} onChange={(e) => changeAmount(+e.target.value)} />
            {text}
        </div>
    )
}

export default CalendarEditableCell;