import React from 'react';
import CalendarCell from '../../../atoms/calendar/calendarCell/CalendarCell';
import "./CalendarDividendCellStyle.scss"

interface CalendarDividendCellProps {
    amount: number;
    amountAfterTax: number;
}

const CalendarDividendCell: React.FC<CalendarDividendCellProps> = ({
    amount,
    amountAfterTax,
}) => {

    const formatAmount = (value: number) => {
        return value.toFixed(3)
    }

    return (
        <CalendarCell>
            <span className='cell-amount'>{formatAmount(amount)}</span>
            <span> / </span>
            <span className='cell-amount-after-tax'>{formatAmount(amountAfterTax)}</span>
        </CalendarCell>
    );
};

export default CalendarDividendCell;
