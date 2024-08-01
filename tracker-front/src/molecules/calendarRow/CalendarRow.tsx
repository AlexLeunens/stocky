import React from "react";
import "./CalendarRowStyle.scss";
import CalendarCell from "../../atoms/calendarCell/CalendarCell";
import { Stock } from "../../interfaces/Stock";

type CalendarRowProps = {
    dividendCalendar: Stock,
}

const CalendarRow: React.FC<CalendarRowProps> = ({
    dividendCalendar,
}) => {

    return (
        <div className="calendar-row">
            <CalendarCell text={dividendCalendar.ticker} key={`${dividendCalendar.ticker}-header`} />
            {dividendCalendar.dividends.map((value, index) => (
                <CalendarCell text={value?.toFixed(3)} key={`${dividendCalendar.ticker}-${index}`} />
            ))}
        </div>
    )
}

export default CalendarRow;