import React, { ChangeEvent, FC, useState } from 'react';
import './PinInput.scss';

const PinInput: FC<{ onCodeChange: (code: string) => void, isCorrect: boolean | null } > = ({ onCodeChange, isCorrect }) => {
    const [codeInput, setCodeInput] = useState<string[]>(['', '', '', '']);

    const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...codeInput];
            newCode[index] = value;

            if (value && index < 3) {
                document.getElementById(`pin-input__${index + 1}`)?.focus();
            }
            setCodeInput(newCode);
            onCodeChange(newCode.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !codeInput[index] && index > 0) {
            document.getElementById(`pin-input__${index - 1}`)?.focus();
        }
      };

    return (
        <div className='pin-input__container'>
            {codeInput.map((digit, index) => (
                <input
                    key={index}
                    id={`pin-input__${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className={"pin-input__input" + (isCorrect === false ? ' incorrect' : '') }
                />
            ))}
        </div>
    )
}

export default PinInput;