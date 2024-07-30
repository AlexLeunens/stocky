import React from "react";
import "./CalendarRowStyle.scss";
import CalendarCell from "../../atoms/calendarCell/CalendarCell";

type CalendarRowProps = {
    cellValues: string[],
    cellKey: string,
    cellHeader?: string,
}

const CalendarRow: React.FC<CalendarRowProps> = ({
    cellValues,
    cellKey,
    cellHeader = ""
}) => {

    return (
        <div className="calendar-row">
            <CalendarCell text={cellHeader} key={`${cellKey}-header`} />
            {cellValues.map((value, index) => (
                <CalendarCell text={value} key={`${cellKey}-${index}`} />
            ))}
        </div>
    )
}

export default CalendarRow;