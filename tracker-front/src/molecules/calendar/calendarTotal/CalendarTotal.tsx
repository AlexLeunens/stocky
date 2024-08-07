import React from "react";
import CalendarCell from "../../../atoms/calendarCell/CalendarCell";
import "./CalendarTotalStyle.scss";

type CalendarTotalProps = {
    monthlyDividends: number[],
}

const CalendarTotal: React.FC<CalendarTotalProps> = ({
    monthlyDividends
}) => {
    const getStockTotalText = () => {
        return monthlyDividends.map(total => {
            const afterTaxes = total * 0.55;
            return `${total.toFixed(3)} (${afterTaxes?.toFixed(3)})`;
        })
    }

    return (
        <div className="calendar-total">
            <CalendarCell text={"Total :"} />
            <CalendarCell text={"#"} />
            {getStockTotalText().map((value, index) => (
                <CalendarCell text={value} key={`total-${index}`} />
            ))}
        </div>
    )
}

export default CalendarTotal;