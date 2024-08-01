import React, { useCallback } from "react";
import Button from "../../atoms/button/Button";
import ProgressBar, { ProgressBarRef } from "../../atoms/progressBar/ProgressBar";
import { Stock } from "../../interfaces/Stock";
import CalendarHeader from "../../molecules/calendarHeader/CalendarHeader";
import CalendarRow from "../../molecules/calendarRow/CalendarRow";
import CalendarTotal from "../../molecules/calendarTotal/CalendarTotal";
import { DividendGetService } from "../../service/DividendGetService";

type DividendCalendarProps = {
    tickers: string[],
}

const DividendCalendar: React.FC<DividendCalendarProps> = ({
    tickers
}) => {
    const [dividendCalendars, setDividendCalendars] = React.useState<Stock[]>([]);
    const childRef = React.useRef<ProgressBarRef>(null);

    const onEvent = (eventMessage: string) => {
        const dividendCalendar: Stock = JSON.parse(eventMessage)
        setDividendCalendars(old => [...old, dividendCalendar])
    }

    const onButtonClick = () => {
        setDividendCalendars([])
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);

        childRef?.current?.runProgress(tickers.length - 1);
        DividendGetService.getDividendCalendars(tickers, startOfYear.toISOString(), onEvent);
    }

    const onOtherButtonClick = () => {
        setDividendCalendars([])
        const callback = (data: Stock[]) => setDividendCalendars(data)
        DividendGetService.getSavedStocks(callback);
    }

    const getCalendarTotal = (): number[] => {
        const monthsTotal = Array.from(Array(12), () => 0);
        dividendCalendars.forEach(dividendCalendar => {
            for (let index = 0; index < 12; index++) {
                monthsTotal[index] = monthsTotal[index] + dividendCalendar.dividends[index];
            }
        })
        return monthsTotal;
    }

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get information" />
            <Button onClick={() => onOtherButtonClick()} text="Get repository" />

            <ProgressBar ref={childRef} />
            <div>
                <CalendarHeader />
                {dividendCalendars.map(dividendCalendar => <CalendarRow dividendCalendar={dividendCalendar} />)}
                <CalendarTotal monthsTotal={getCalendarTotal()} />
            </div>

        </div>
    )
}

export default DividendCalendar;