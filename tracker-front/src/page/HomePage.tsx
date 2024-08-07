import React from "react";
import DividendCalendar from "../organisms/dividendCalendar/DividendCalendar";
import TickerInput from "../molecules/tickerInput/TickerInput";
import { TickerInfos } from "../interfaces/TickerInfos";

type HomePageProps = {

}

const HomePage: React.FC<HomePageProps> = () => {
    const [tickerInfos, setTickerInfos] = React.useState<TickerInfos[]>([]);

    return (
        <div>
            <DividendCalendar tickerInfos={tickerInfos} />
            <TickerInput tickerInfos={tickerInfos} setTickerInfos={setTickerInfos} />
        </div>
    )
}

export default HomePage;