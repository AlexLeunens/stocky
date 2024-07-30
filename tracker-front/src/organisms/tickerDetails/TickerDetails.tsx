import React from "react";
import Button from "../../atoms/button/Button";
import { TickerInformation } from "../../interfaces/TickerInformation";
import { TickerGetService } from "../../service/TickerGetService";

type TickerDetailsProps = {
    ticker: string,
}

const TickerDetails: React.FC<TickerDetailsProps> = ({
    ticker
}) => {
    const [infos, setInfos] = React.useState<TickerInformation | null>(null);

    const onButtonClick = () => {
        TickerGetService.getTickerInformation(ticker)
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

export default TickerDetails;