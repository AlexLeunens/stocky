import React, { ReactNode } from "react";
import "./CalendarCellStyle.scss"

type CalendarCellProps = {
    children: ReactNode,
}

const CalendarCell: React.FC<CalendarCellProps> = ({
    children,
}) => {
    return (
        <div className="calendar-cell">
            {children}
        </div>
    )
}

export default CalendarCell;