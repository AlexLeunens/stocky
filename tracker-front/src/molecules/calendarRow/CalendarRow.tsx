import React from "react";
import "./CalendarRowStyle.scss";
import CalendarCell from "../../atoms/calendarCell/CalendarCell";
import { Calendar } from "../../interfaces/Calendar";

type CalendarRowProps = {
    dividendCalendar: Calendar,
}

const CalendarRow: React.FC<CalendarRowProps> = ({
    dividendCalendar,
}) => {

    return (
        <div className="calendar-row">
            <CalendarCell text={dividendCalendar.ticker} key={`${dividendCalendar.ticker}-header`} />
            {dividendCalendar.dividends.map((value, index) => (
                <CalendarCell text={value.cashAmount?.toFixed(3)} key={`${dividendCalendar.ticker}-${index}`} />
            ))}
        </div>
    )
}

export default CalendarRow;