import React from "react";
import Button from "../atoms/Button";
import { DividendInformation } from "../interfaces/DividendInformationInterface";
import { DividendGetInformationService } from "../service/DividendGetInformationService";

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

    const parseDate = (date: number[]) => {
        var parsedDate = new Date(date[0], date[1], date[2]);
        return parsedDate.toLocaleDateString();
    }

    return (
        <div>
            <Button onClick={() => onButtonClick()} text="Get information" />
            <div>
                {infos?.results?.map((result, index) => (
                    <div key={`${result.ticker}-${index}`}>
                        <div>
                            {parseDate(result?.pay_date)}
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