import React from "react";
import Button from "../../atoms/button/Button";
import TextInput from "../../atoms/textInput/TextInput";
import "./TickerInputStyle.scss";

type TickerInputProps = {
    tickers: string[],
    setTickers: React.Dispatch<React.SetStateAction<string[]>>,
}

const TickerInput: React.FC<TickerInputProps> = ({
    tickers,
    setTickers
}) => {
    const [ticker, setTicker] = React.useState<string>("");

    const addTicker = (ticker: string) => {
        setTickers(old => [...old, ticker])
    }

    const removeTicker = (ticker: string) => {
        const updated = [...tickers].filter(t => t !== ticker)
        setTickers(updated)
    }

    return (
        <div>
            <div className="ticker-input">
                <TextInput onChange={(value) => setTicker(value)} />
                <Button text="add ticker" onClick={() => addTicker(ticker)} />
            </div>

            <div className="ticker-list">
                {tickers.map(ticker => (
                    <div className="ticker-list-item">
                        <div>
                            {ticker}
                        </div>
                        <div className="remove-ticker-button" onClick={() => removeTicker(ticker)}>X</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TickerInput;