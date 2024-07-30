import React from "react";
import TextInput from "../atoms/textInput/TextInput";
import DividendInformationDisplay from "../organisms/dividendInformationDisplay/DividendInformationDisplay";
import TickerInformationDisplay from "../organisms/tickerInformationDisplay/TickerInformationDisplay";
import DividendCalendar from "../organisms/dividendCalendar/DividendCalendar";

type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {
    const [ticker, setTicker] = React.useState<string>("");

    return (
        <div>
            <TextInput onChange={(value) => setTicker(value)} />

            <TickerInformationDisplay ticker={ticker} />
            <DividendInformationDisplay ticker={ticker} />
            <DividendCalendar ticker={ticker} />
        </div>
    )
}

export default HomePage;