import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import './PinInput.scss';

interface IPinInputProps {
   onCodeChange: (code: string) => void;
   isCorrect: boolean | null;
}

const PinInput: FC<IPinInputProps> = ({ onCodeChange, isCorrect }) => {
   const [codeInput, setCodeInput] = useState<string[]>(['', '', '', '']);

   const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
      const value: string = e.target.value;

      if (/^\d*$/.test(value) && value.length <= 1) {
         const newCode: string[] = [...codeInput];
         newCode[index] = value;

         if (value && index < 3) {
            document.getElementById(`pin-input__${index + 1}`)?.focus();
         }
         setCodeInput(newCode);
         onCodeChange(newCode.join(''));
      }
   };

   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Backspace' && !codeInput[index] && index > 0) {
         document.getElementById(`pin-input__${index - 1}`)?.focus();
      }
   };

   return (
      <div className='pin-input__container'>
         {codeInput.map((digit: string, index: number) => (
            <input
               key={index}
               id={`pin-input__${index}`}
               type="text"
               value={digit}
               onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e)}
               onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
               maxLength={1}
               className={"pin-input__input" + (isCorrect === false ? ' incorrect' : '') }
            />
         ))}
      </div>
   )
}

export default PinInput;