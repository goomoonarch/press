/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { AmountInput } from "./AmountInput";
import gsap from "gsap";

export const InputValues = ({ onChangeUserInputs }) => {
  const otherRef = useRef(null);
  /**InputAmountComponent */
  const [amount, setAmount] = useState("");
  const [optionalAmount, setOptionalAmount] = useState("");

  /**CustomMonthSelectComponent */
  const [months, setMonths] = useState(6);
  const [isTwoFocused, setIsTwoFocused] = useState(false);

  const handleMonthsChange = (e) => {
    const rawMonths = e.target.value.replace(/[^0-9]/g, "");
    setMonths(rawMonths);
  };

  const handleTwoFocus = () => setIsTwoFocused(true);
  const handleTwoBlur = () => setIsTwoFocused(false);

  const zeroCuote = amount ? amount / 2 : 0;

  useEffect(() => {
    onChangeUserInputs({ amount, months, optionalAmount, zeroCuote });
  }, [amount, months, optionalAmount]);

  useEffect(() => {
    if (amount && !optionalAmount) {
      gsap.to(otherRef.current, {
        marginTop: "24px",
        duration: 0.3,
        ease: "ease-in-out",
      });
    } else if (!amount && !optionalAmount) {
      gsap.to(otherRef.current, {
        marginTop: "8px",
        duration: 0.3,
        ease: "ease-in-out",
      });
    }
  }, [amount, optionalAmount]);

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    if (newAmount === "") {
      setOptionalAmount("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <AmountInput
          value={amount}
          onChange={handleAmountChange}
          inputWidth="w-full"
          divWidth="w-[256px]"
          onlyRead={false}
          placeholder="$ Monto en COP"
          label="Monto en COP"
        />
        <div
          className={`bg-[#f6f6f6] w-[56px] ml-[8px] rounded-[6px] flex justify-center ${
            isTwoFocused ? "ring-2 ring-[#F2CB57]" : ""
          }`}
        >
          <div className="absolute translate-y-[-20px] translate-x-[-6px] text-[14px] font-neue opacity-75 text-[#444444]">
            Meses
          </div>
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
      <div ref={otherRef} className="flex justify-between mt-[8px]">
        <AmountInput
          value={zeroCuote}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={true}
          placeholder="$ Cuota inicial"
          label="Cuota inicial en COP"
        />
        <AmountInput
          value={optionalAmount}
          onChange={setOptionalAmount}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={amount ? false : true}
          xOffset="traslate-x-[20px]"
          placeholder="$ Monto opcional"
          label="Monto opcional"
        />
      </div>
    </div>
  );
};
