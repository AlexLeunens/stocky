import React from "react";

type ButtonProps = {
    onClick: () => void,
    text: string,
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    text
}) => {
    return (
        <div>
            <button onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default Button;