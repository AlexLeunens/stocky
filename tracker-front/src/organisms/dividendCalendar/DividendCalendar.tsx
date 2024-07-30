import React from "react";
import CalendarRow from "../../molecules/calendarRow/CalendarRow";
import Button from "../../atoms/button/Button";
import { DividendGetInformationService } from "../../service/DividendGetInformationService";
import { DividendInformation } from "../../interfaces/DividendInformationInterface";
import { DateUtils } from "../../utils/DateUtils";

type DividendCalendarProps = {
    ticker: string,
}

const DividendCalendar: React.FC<DividendCalendarProps> = ({
    ticker
}) => {
    const [stocksDividends, setStocksDividends] = React.useState<string[][]>([]);

    const updateData = (messageData: string) => {
        const parsedDividendInformation: DividendInformation = JSON.parse(messageData)
        const calendarValues = getCalendarValues(parsedDividendInformation)
        setStocksDividends(old => [...old, calendarValues])
    }

    const onButtonClick = () => {
        setStocksDividends([])
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        DividendGetInformationService.getDividendCalendar([ticker], startOfYear.toISOString(), updateData);
    }

    const getCalendarValues = (dividendInformation: DividendInformation | null): string[] => {
        const dividends = dividendInformation?.results;
        const calendarValues = Array(12).fill("0");

        dividends?.forEach(dividend => {
            const month = DateUtils.parseDate(dividend.pay_date).getMonth();
            const value = dividend.cash_amount;
            calendarValues[month-1] = value?.toString();
        })

        return calendarValues;
    }

    const getMonthName = (month: number): string => {
        const date = new Date(2009, month, 10);
        return date.toLocaleString('default', { month: 'long' });
    }

    const getMonths = (): string[] => {
        const months = Array.from(Array(12), (e, i) => i);
        return months.map(month => getMonthName(month));
    }

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get information" />

            <div>
                <CalendarRow cellValues={getMonths()} cellKey="header" />
                {stocksDividends.map(stockDividends =>  <CalendarRow cellValues={stockDividends} cellKey={ticker} cellHeader="O" />)}
            </div>

        </div>
    )
}

export default DividendCalendar;