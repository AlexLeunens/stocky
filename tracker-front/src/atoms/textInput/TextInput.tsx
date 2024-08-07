import React, { ChangeEvent } from "react";

type TextInputProps = {
    value: string,
    onChange: (value: string) => void,
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value;
        onChange(value);
    }

    return (
        <div>
            <input type="text" value={value} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default TextInput;