import React from "react";
import { Stock } from "../../../interfaces/Stock";
import CalendarDividendCell from "../calendarDividendCell/CalendarDividendCell";
import CalendarEditableCell from "../calendarEditableCell/CalendarEditableCell";
import CalendarTextCell from "../calendarTextCell/CalendarTextCell";
import "./CalendarRowStyle.scss";

type CalendarRowProps = {
    stock: Stock,
}

const CalendarRow: React.FC<CalendarRowProps> = ({
    stock,
}) => {
    const getDividendAmount = (amount: number, dividend: number) => {
        return amount * dividend;
    }

    const getDividendAmountAfterTax = (amount: number, dividend: number) => {
        const total = getDividendAmount(amount, dividend)
        return total * 0.55;
    }

    return (
        <div className="calendar-row">
            <CalendarTextCell text={stock.ticker} key={`${stock.ticker}-header`} />
            <CalendarEditableCell stock={stock} text={stock.amount?.toString()} key={`${stock.ticker}-amount-header`} />
            {stock.dividends.map((value, index) => (
                <CalendarDividendCell
                    key={`${stock.ticker}-${index}`}
                    amount={getDividendAmount(stock.amount, value)}
                    amountAfterTax={getDividendAmountAfterTax(stock.amount, value)}
                />
            ))}
        </div>
    )
}

export default CalendarRow;