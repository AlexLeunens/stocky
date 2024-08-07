import { createContext } from "react";
import { Stock } from "../interfaces/Stock";

interface CalendarContextInterface {
    stocks: Stock[],
    setStocks: React.Dispatch<React.SetStateAction<Stock[]>>,
}

export const CalendarContext = createContext<CalendarContextInterface>({
    stocks: [],
    setStocks: () => { },
});