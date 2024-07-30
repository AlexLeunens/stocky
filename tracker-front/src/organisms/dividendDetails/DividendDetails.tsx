import React from "react";
import Button from "../../atoms/button/Button";
import { DividendInformation } from "../../interfaces/DividendInformation";
import { DividendGetService } from "../../service/DividendGetService";
import { DateUtils } from "../../utils/DateUtils";

type DividendDetailsProps = {
    ticker: string,
}

const DividendDetails: React.FC<DividendDetailsProps> = ({
    ticker,
}) => {
    const [infos, setInfos] = React.useState<DividendInformation | null>(null);

    const onButtonClick = () => {
        DividendGetService.getDividendInformation(ticker)
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

export default DividendDetails;