/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { formatCOP } from "../utils";

export const AmountInput = ({
  value,
  onChange,
  inputWidth,
  divWidth,
  onlyRead,
  placeholder,
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const amountRef = useRef(null);

  useEffect(() => {
    if (value !== "") {
      gsap.to(amountRef.current, {
        opacity: 0.75,
        y: -20,
        duration: 0.3,
      });
    } else {
      gsap.to(amountRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.3,
      });
    }
  }, [value, onlyRead]);

  const handleAmountChange = (e) => {
    const rawAmount = e.target.value.replace(/[^0-9]/g, "");
    onChange(rawAmount);
    if (rawAmount !== "") {
      gsap.to(amountRef.current, {
        opacity: 0.75,
        y: -20,
        duration: 0.3,
      });
    } else {
      gsap.to(amountRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.3,
      });
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div>
      <div
        ref={amountRef}
        className={`absolute text-[14px] font-neue text-[#444444] opacity-0 -z-10`}
      >
        {label}
      </div>
      <div
        id="amount"
        className={`bg-[#f6f6f6] ${divWidth} h-[35px] rounded-[6px] flex justify-normal items-center ${
          isFocused ? "ring-2 ring-[#F2CB57]" : ""
        }`}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={value === "" ? "" : formatCOP(value).toString()}
          onChange={onlyRead ? undefined : handleAmountChange}
          onFocus={onlyRead ? undefined : handleFocus}
          onBlur={onlyRead ? undefined : handleBlur}
          readOnly={onlyRead}
          className={`font-neue bg-[#f6f6f6] text-[#444444] focus:outline-none ${inputWidth} px-[14px] ${
            value ? "tracking-[.16em]" : ""
          }`}
          style={{ caretColor: "#F2CB57" }}
        />
      </div>
    </div>
  );
};
