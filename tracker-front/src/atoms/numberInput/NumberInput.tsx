import React, { ChangeEvent } from "react";

type NumberInputProps = {
    onChange: (value: number) => void,
}

const NumberInput: React.FC<NumberInputProps> = ({
    onChange,
}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value;
        onChange(+value);
    }

    return (
        <div>
            <input type="number" onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default NumberInput;