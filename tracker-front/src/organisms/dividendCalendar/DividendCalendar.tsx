import React from "react";
import Button from "../../atoms/button/Button";
import { Calendar } from "../../interfaces/Calendar";
import CalendarRow from "../../molecules/calendarRow/CalendarRow";
import { DividendGetService } from "../../service/DividendGetService";
import CalendarHeader from "../../molecules/calendarHeader/CalendarHeader";

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

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get information" />

            <div>
                <CalendarHeader />
                {dividendCalendars.map(dividendCalendar => <CalendarRow dividendCalendar={dividendCalendar} />)}
            </div>

        </div>
    )
}

export default DividendCalendar;