import React from "react";
import CalendarTextCell from "../calendarTextCell/CalendarTextCell";
import "./CalendarHeaderStyle.scss";

type CalendarHeaderProps = {
}

const CalendarHeader: React.FC<CalendarHeaderProps> = () => {

    const getMonthName = (month: number): string => {
        const date = new Date(2009, month, 10);
        return date.toLocaleString('default', { month: 'long' });
    }

    const getMonths = (): string[] => {
        const months = Array.from(Array(12), (e, i) => i);
        return months.map(month => getMonthName(month));
    }

    return (
        <div className="calendar-header">
            <CalendarTextCell text={""} />
            <CalendarTextCell text={"#"} />
            {getMonths().map((value, index) => (
                <CalendarTextCell
                    key={`header-${index}`}
                    text={value}
                />
            ))}
        </div>
    )
}

export default CalendarHeader;