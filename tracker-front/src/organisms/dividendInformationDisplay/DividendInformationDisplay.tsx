import React from "react";
import Button from "../../atoms/button/Button";
import { DividendInformation } from "../../interfaces/DividendInformationInterface";
import { DividendGetInformationService } from "../../service/DividendGetInformationService";
import { DateUtils } from "../../utils/DateUtils";

type DividendInformationDisplayProps = {
    ticker: string,
}

const DividendInformationDisplay: React.FC<DividendInformationDisplayProps> = ({
    ticker,
}) => {
    const [infos, setInfos] = React.useState<DividendInformation | null>(null);

    const onButtonClick = () => {
        DividendGetInformationService.getDividendInformation(ticker)
            .then(infos => setInfos(infos));
    }

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get information" />
            <div>
                {infos?.results?.map((result, index) => (
                    <div key={`${result.ticker}-${index}`}>
                        <div>
                            {DateUtils.parseDateToString(result?.pay_date)}
                        </div>
                        <div>
                            {`${result?.cash_amount}${result?.currency}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DividendInformationDisplay;