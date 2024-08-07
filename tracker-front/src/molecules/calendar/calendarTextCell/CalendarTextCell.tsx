import React from 'react';
import CalendarCell from '../../../atoms/calendar/calendarCell/CalendarCell';
import "./CalendarTextCellStyle.scss";

interface CalendarTextCellProps {
    text: string;
}

const CalendarTextCell: React.FC<CalendarTextCellProps> = ({
    text,
}) => {
    return (
        <CalendarCell>
            <span className="cell-text">{text}</span>
        </CalendarCell>
    );
};

export default CalendarTextCell;
