import React from "react";
import "./CalendarRowStyle.scss";
import CalendarCell from "../../atoms/calendarCell/CalendarCell";

type CalendarRowProps = {
    cellValues: string[],
    cellKey: string,
}

const CalendarRow: React.FC<CalendarRowProps> = ({
    cellValues,
    cellKey,
}) => {

    return (
        <div className="calendar-row">
            {cellValues.map((value, index) => (
                <CalendarCell text={value} key={`${cellKey}-${index}`} />
            ))}
        </div>
    )
}

export default CalendarRow;