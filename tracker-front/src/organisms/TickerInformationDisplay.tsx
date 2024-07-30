import React from "react";
import Button from "../atoms/Button";
import { StockInformationInterface } from "../interfaces/StockInformationInterface";
import { TickerGetInformationService } from "../service/TickerGetInformationService";

type TickerInformationDisplayProps = {
    ticker: string,
}

const TickerInformationDisplay: React.FC<TickerInformationDisplayProps> = ({
    ticker
}) => {
    const [infos, setInfos] = React.useState<StockInformationInterface | null>(null);

    const onButtonClick = () => {
        TickerGetInformationService.getTickerInformation(ticker)
            .then(infos => setInfos(infos));
    }

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get informations" />

            <div>
                {infos?.results.name}
            </div>
            <div>
                {infos?.results.description}
            </div>
        </div>
    )
}

export default TickerInformationDisplay;