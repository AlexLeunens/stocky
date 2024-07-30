import React from "react";
import TextInput from "../atoms/textInput/TextInput";
import DividendDetails from "../organisms/dividendDetails/DividendDetails";
import TickerDetails from "../organisms/tickerDetails/TickerDetails";
import DividendCalendar from "../organisms/dividendCalendar/DividendCalendar";

type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {
    const [ticker, setTicker] = React.useState<string>("");

    return (
        <div>
            <TextInput onChange={(value) => setTicker(value)} />

            <TickerDetails ticker={ticker} />
            <DividendDetails ticker={ticker} />
            <DividendCalendar ticker={ticker} />
        </div>
    )
}

export default HomePage;