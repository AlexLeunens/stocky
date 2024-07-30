import React from "react";
import TextInput from "../atoms/textInput/TextInput";
import DividendDetails from "../organisms/dividendDetails/DividendDetails";
import TickerDetails from "../organisms/tickerDetails/TickerDetails";
import DividendCalendar from "../organisms/dividendCalendar/DividendCalendar";
import TickerInput from "../molecules/tickerInput/TickerInput";

type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {
    const [tickers, setTickers] = React.useState<string[]>([]);

    return (
        <div>
            <TickerInput tickers={tickers} setTickers={setTickers} />

            <DividendCalendar tickers={tickers} />
        </div>
    )
}

export default HomePage;