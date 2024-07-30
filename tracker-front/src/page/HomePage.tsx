import React from "react";
import TextInput from "../atoms/TextInput";
import DividendInformationDisplay from "../organisms/DividendInformationDisplay";
import TickerInformationDisplay from "../organisms/TickerInformationDisplay";

type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {
    const [ticker, setTicker] = React.useState<string>("");

    return (
        <div>
            <TextInput onChange={(value) => setTicker(value)} />

            <TickerInformationDisplay ticker={ticker} />
            <DividendInformationDisplay ticker={ticker} />
        </div>
    )
}

export default HomePage;