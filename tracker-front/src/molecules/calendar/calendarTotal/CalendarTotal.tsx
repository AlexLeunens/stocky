import React from "react";
import CalendarTextCell from "../calendarTextCell/CalendarTextCell";
import "./CalendarTotalStyle.scss";
import CalendarDividendCell from "../calendarDividendCell/CalendarDividendCell";

type CalendarTotalProps = {
    monthlyDividends: number[],
}

const CalendarTotal: React.FC<CalendarTotalProps> = ({
    monthlyDividends
}) => {
    return (
        <div className="calendar-total">
            <CalendarTextCell text={"Total :"} />
            <CalendarTextCell text={""} />
            {monthlyDividends.map((value, index) => (
                <CalendarDividendCell amount={value} amountAfterTax={value * 0.55} key={`total-${index}`} />
            ))}
        </div>
    )
}

export default CalendarTotal;