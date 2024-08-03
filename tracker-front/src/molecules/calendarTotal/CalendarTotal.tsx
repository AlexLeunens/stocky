import React from "react";
import CalendarCell from "../../atoms/calendarCell/CalendarCell";
import "./CalendarTotalStyle.scss";

type CalendarTotalProps = {
    monthsTotal: number[]
}

const CalendarTotal: React.FC<CalendarTotalProps> = ({
    monthsTotal,
}) => {
    return (
        <div className="calendar-total">
            <CalendarCell text={"Total :"} />
            <CalendarCell text={"#"} />
            {monthsTotal.map((value, index) => (
                <CalendarCell text={value?.toFixed(3)} key={`total-${index}`} />
            ))}
        </div>
    )
}

export default CalendarTotal;