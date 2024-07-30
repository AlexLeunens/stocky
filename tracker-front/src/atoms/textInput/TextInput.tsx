import React, { ChangeEvent } from "react";

type TextInputProps = {
    onChange: (value: string) => void,
}

const TextInput: React.FC<TextInputProps> = ({
    onChange,
}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value;
        onChange(value);
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default TextInput;