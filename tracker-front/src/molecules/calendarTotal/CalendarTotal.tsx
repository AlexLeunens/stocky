import React from "react";
import CalendarCell from "../../atoms/calendarCell/CalendarCell";
import "./CalendarTotalStyle.scss";
import { Stock } from "../../interfaces/Stock";

type CalendarTotalProps = {
    stocks: Stock[]
}

const CalendarTotal: React.FC<CalendarTotalProps> = ({
    stocks,
}) => {

    const getCalendarTotal = (): number[] => {
        const monthsTotal = Array.from(Array(12), () => 0);
        stocks.forEach(stock => {
            for (let index = 0; index < 12; index++) {
                const stockTotal = stock.dividends[index] * stock.amount;
                monthsTotal[index] = monthsTotal[index] + stockTotal;
            }
        })

        return monthsTotal;
    }

    const getStockTotalText = () => {
        const monthsTotal = getCalendarTotal();
        return monthsTotal.map(total => {

            const afterTaxes = total * 0.55;
            return `${total.toFixed(3)} (${afterTaxes?.toFixed(3)})`;
        })
    }

    return (
        <div className="calendar-total">
            <CalendarCell text={"Total :"} />
            <CalendarCell text={"#"} />
            {getStockTotalText().map((value, index) => (
                <CalendarCell text={value} key={`total-${index}`} />
            ))}
        </div>
    )
}

export default CalendarTotal;