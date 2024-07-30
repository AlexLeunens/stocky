import React from "react";
import Button from "../../atoms/button/Button";
import { Calendar } from "../../interfaces/Calendar";
import CalendarRow from "../../molecules/calendarRow/CalendarRow";
import { DividendGetService } from "../../service/DividendGetService";
import CalendarHeader from "../../molecules/calendarHeader/CalendarHeader";
import { DateUtils } from "../../utils/DateUtils";
import CalendarTotal from "../../molecules/calendarTotal/CalendarTotal";

type DividendCalendarProps = {
    tickers: string[],
}

const DividendCalendar: React.FC<DividendCalendarProps> = ({
    tickers
}) => {
    const [dividendCalendars, setDividendCalendars] = React.useState<Calendar[]>([]);

    const onEvent = (eventMessage: string) => {
        const dividendCalendar: Calendar = JSON.parse(eventMessage)
        setDividendCalendars(old => [...old, dividendCalendar])
    }

    const onButtonClick = () => {
        setDividendCalendars([])
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        DividendGetService.getDividendCalendars(tickers, startOfYear.toISOString(), onEvent);
    }

    const getCalendarTotal = (): number[] => {
        const monthsTotal = Array.from(Array(12), () => 0);
        dividendCalendars.flatMap(calendar => calendar.dividends)
            .forEach(dividend => {
                const date = DateUtils.parseDate(dividend.payDate);
                const monthIndex = date.getMonth() - 1;

                monthsTotal[monthIndex] = monthsTotal[monthIndex] + dividend.cashAmount;
            })
        return monthsTotal;
    }

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get information" />

            <div>
                <CalendarHeader />
                {dividendCalendars.map(dividendCalendar => <CalendarRow dividendCalendar={dividendCalendar} />)}
                <CalendarTotal monthsTotal={getCalendarTotal()} />
            </div>

        </div>
    )
}

export default DividendCalendar;