import React from "react";
import Button from "../../atoms/button/Button";
import TextInput from "../../atoms/textInput/TextInput";
import "./TickerInputStyle.scss";
import NumberInput from "../../atoms/numberInput/NumberInput";
import { TickerInfos } from "../../interfaces/TickerInfos";

type TickerInputProps = {
    tickerInfos: TickerInfos[],
    setTickerInfos: React.Dispatch<React.SetStateAction<TickerInfos[]>>,
}

const TickerInput: React.FC<TickerInputProps> = ({
    tickerInfos,
    setTickerInfos
}) => {
    const [ticker, setTicker] = React.useState<string>("");
    const [amount, setAmount] = React.useState<number>(1);

    const addTicker = (ticker: string) => {
        const newTickerInfos = {
            ticker,
            amount,
        }
        setTickerInfos(old => [...old, newTickerInfos])
        setTicker("")
        setAmount(1)
    }

    const removeTicker = (ticker: string) => {
        const updated = [...tickerInfos].filter(t => t?.ticker !== ticker)
        setTickerInfos(updated)
    }

    const getTickerText = (tickerInfos: TickerInfos) => {
        return `${tickerInfos?.ticker} (${tickerInfos.amount})`
    }

    return (
        <div>
            <div className="ticker-input">
                <TextInput value={ticker} onChange={(value) => setTicker(value)} />
                <NumberInput value={amount} onChange={(value) => setAmount(value)} />
                <Button text="add ticker" onClick={() => addTicker(ticker)} />
            </div>

            <div className="ticker-list">
                {tickerInfos.map(tickerInfos => (
                    <div key={`${tickerInfos.ticker}-selector`} className="ticker-list-item">
                        <div>
                            {getTickerText(tickerInfos)}
                        </div>
                        <div className="remove-ticker-button" onClick={() => removeTicker(tickerInfos?.ticker)}>X</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TickerInput;