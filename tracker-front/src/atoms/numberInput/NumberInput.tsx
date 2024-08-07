import React, { ChangeEvent } from "react";

type NumberInputProps = {
    value: number,
    onChange: (value: number) => void,
}

const NumberInput: React.FC<NumberInputProps> = ({
    value,
    onChange,
}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value;
        onChange(+value);
    }

    return (
        <div>
            <input type="number" value={value} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default NumberInput;