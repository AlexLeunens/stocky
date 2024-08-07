import React from "react";
import Button from "../../atoms/button/Button";
import ProgressBar, { ProgressBarRef } from "../../atoms/progressBar/ProgressBar";
import { Stock } from "../../interfaces/Stock";
import { TickerInfos } from "../../interfaces/TickerInfos";
import CalendarHeader from "../../molecules/calendar/calendarHeader/CalendarHeader";
import CalendarRow from "../../molecules/calendar/calendarRow/CalendarRow";
import CalendarTotal from "../../molecules/calendar/calendarTotal/CalendarTotal";
import { DividendGetService } from "../../service/DividendGetService";
import { DividendPostService } from "../../service/DividendPostService";
import { CalendarContext } from "../../context/CalendarContext";
import Chart from "../chart/Chart";

type DividendCalendarProps = {
    tickerInfos: TickerInfos[],
}

const DividendCalendar: React.FC<DividendCalendarProps> = ({
    tickerInfos
}) => {

    const [stocks, setStocks] = React.useState<Stock[]>([]);
    const childRef = React.useRef<ProgressBarRef>(null);

    const onEvent = (eventMessage: string) => {
        const stock: Stock = JSON.parse(eventMessage)
        // TODO: handle amounts better
        const newStock = {
            ...stock,
            amount: tickerInfos.filter(ti => ti.ticker === stock.ticker)?.[0]?.amount,
        }

        setStocks(old => [...old, newStock])
    }

    const onAddStock = () => {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);

        childRef?.current?.runProgress(tickerInfos.length - 1);
        const tickers = tickerInfos.map(tickerInfo => tickerInfo.ticker);
        DividendGetService.getDividendCalendars(tickers, startOfYear.toISOString(), onEvent);
    }

    const onGetRepoClick = () => {
        setStocks([])
        const callback = (data: Stock[]) => setStocks(data)
        DividendGetService.getSavedStocks(callback);
    }

    const onPostClick = () => {
        DividendPostService.saveStocks(stocks, () => null);
    }


    const getCalendarTotal = (): number[] => {
        const monthsTotal = Array.from(Array(12), () => 0);
        stocks.forEach(stock => {
            for (let index = 0; index < 12; index++) {
                const stockTotal = stock.dividends[index] * stock.amount;
                monthsTotal[index] = monthsTotal[index] + stockTotal;
            }
        })

        return monthsTotal;
    }


    const context = {
        stocks,
        setStocks,
    }

    return (
        <CalendarContext.Provider value={context}>
            <div>
                <Chart monthlyDividends={getCalendarTotal()} />
                
                <Button onClick={() => onAddStock()} text="Add stock" />
                <Button onClick={() => onGetRepoClick()} text="Get repository" />
                <Button onClick={() => onPostClick()} text="POST stocks" />

                <ProgressBar ref={childRef} />
                <div>
                    <CalendarHeader />
                    {stocks.map(stock => <CalendarRow stock={stock} />)}
                    <CalendarTotal monthlyDividends={getCalendarTotal()} />
                </div>
            </div>
        </CalendarContext.Provider>
    )
}

export default DividendCalendar;