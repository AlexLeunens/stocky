export interface Calendar {
    ticker: string,
    dividends: CalendarDividend[],
}

export interface CalendarDividend {
    cashAmount: number,
    currency: string,
    payDate: number[],
}