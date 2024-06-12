/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatCOP } from "../utils";

export const InputValue = ({ onChangeUserInputs }) => {
  /**InputAmountComponetn */
  const [amount, setAmount] = useState("");
  const [isOneFocused, setIsOneFocused] = useState(false);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setAmount(rawValue);
  };

  const handleOneFocus = () => setIsOneFocused(true);
  const handleOneBlur = () => setIsOneFocused(false);

  /**CustomMonthSelectComponent */
  const [months, setMonths] = useState(6);
  const [isTwoFocused, setIsTwoFocused] = useState(false);

  const handleMonthsChange = (e) => {
    setMonths(e.target.value);
  };

  const handleTwoFocus = () => setIsTwoFocused(true);
  const handleTwoBlur = () => setIsTwoFocused(false);

  useEffect(() => {
    onChangeUserInputs({ amount, months });
  }, [amount, months]);

  return (
    <div className="flex justify-between">
      <div
        className={`bg-[#f6f6f6] w-[256px] h-[35px] rounded-[8px] flex justify-normal items-center ${
          isOneFocused ? "ring-2 ring-[#F2CB57]" : ""
        }`}
      >
        <label
          htmlFor="phoneValue"
          className={`font-neue pl-[10px] text-[#444444] ${
            isOneFocused ? "opacity-100" : "opacity-50"
          }`}
        >
          Monto
        </label>
        <input
          type="text"
          id="phoneValue"
          value={formatCOP(amount).toString()}
          onChange={handleAmountChange}
          onFocus={handleOneFocus}
          onBlur={handleOneBlur}
          className="font-neue w-[184px] bg-[#f6f6f6] text-[#444444] focus:outline-none pl-[8px] tracking-[.16em]"
          style={{ caretColor: "#F2CB57" }}
        />
      </div>
      <div
        className={`bg-[#f6f6f6] w-[56px] ml-[8px] rounded-[8px] flex justify-center ${
          isTwoFocused ? "ring-2 ring-[#F2CB57]" : ""
        }`}
      >
        <input
          type="text"
          id="months"
          value={months}
          onChange={handleMonthsChange}
          onFocus={handleTwoFocus}
          onBlur={handleTwoBlur}
          className="bg-[#f6f6f6] w-[40px] text-center font-neue focus:outline-none"
        />
      </div>
    </div>
  );
};
