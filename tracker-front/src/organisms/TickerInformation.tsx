import React from "react";
import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";
import { TickerGetInformationService } from "../service/TickerGetInformationService";
import { StockInformationInterface } from "../interfaces/StockInformationInterface";

type TickerInformationProps = {

}

const TickerInformation: React.FC<TickerInformationProps> = () => {
    const [ticker, setTicker] = React.useState<string>("");
    const [infos, setInfos] = React.useState<StockInformationInterface | null>(null);


    const onButtonClick = () => {
        TickerGetInformationService.getTickerInformation(ticker)
            .then(infos => setInfos(infos));
    }

    return (
        <div>
            <TextInput onChange={(value) => setTicker(value)} />
            <Button onClick={() => onButtonClick()} text="Get informations"/>

            <div>
                {infos?.results.name}
            </div>
            <div>
                {infos?.results.description}
            </div>
        </div>
    )
}

export default TickerInformation;