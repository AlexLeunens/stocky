import React from "react";
import "./CalendarCellStyle.scss"

type CalendarCellProps = {
    text: string,
}

const CalendarCell: React.FC<CalendarCellProps> = ({
    text
}) => {
    return (
        <div className="calendar-cell">
            {text}
        </div>
    )
}

export default CalendarCell;