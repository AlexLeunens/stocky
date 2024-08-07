import React from "react";
import "./CalendarRowStyle.scss";
import CalendarCell from "../../../atoms/calendarCell/CalendarCell";
import { Stock } from "../../../interfaces/Stock";
import CalendarEditableCell from "../../../atoms/calendarEditableCell/CalendarEditableCell";

type CalendarRowProps = {
    stock: Stock,
}

const CalendarRow: React.FC<CalendarRowProps> = ({
    stock,
}) => {

    const getDividendAmount = (amount: number, dividend: number) => {
        return amount * dividend;
    }

    const getDividendAmountAfterTax = (dividendTotal: number) => {
        return dividendTotal * 0.55;
    }

    const getDividendText = (amount: number, dividend: number) => {
        const total = getDividendAmount(amount, dividend);
        const afterTaxes = getDividendAmountAfterTax(total);

        return `${total.toFixed(3)} (${afterTaxes?.toFixed(3)})`
    }

    return (
        <div className="calendar-row">
            <CalendarCell text={stock.ticker} key={`${stock.ticker}-header`} />
            <CalendarEditableCell stock={stock} text={stock.amount?.toString()} key={`${stock.ticker}-amount-header`} />
            {stock.dividends.map((value, index) => (
                <CalendarCell text={(getDividendText(stock.amount, value))} key={`${stock.ticker}-${index}`} />
            ))}
        </div>
    )
}

export default CalendarRow;