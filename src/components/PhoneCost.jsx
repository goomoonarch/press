/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { AmountInput } from "./AmountInput";
import gsap from "gsap";

export const PhoneCost = ({
  onChangePhoneCost,
  adminState,
  onAnimationComplete,
}) => {
  const costRef = useRef(null);
  const [phoneCost, setPhoneCost] = useState("");

  const handlePhoneCost = (newCost) => {
    setPhoneCost(newCost);
    onChangePhoneCost(newCost);
  };

  useEffect(() => {
    if (adminState) {
      gsap.fromTo(
        costRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(costRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: "back.in(1.7)",
        onComplete: onAnimationComplete,
      });
    }
  }, [adminState]);

  useEffect(() => {
    if (phoneCost) {
      gsap.to(costRef.current, {
        marginTop: "24px",
        duration: 0.3,
        ease: "ease-in-out",
      });
    } else {
      gsap.to(costRef.current, {
        marginTop: "8px",
        duration: 0.3,
        ease: "ease-in-out",
      });
    }
  }, [phoneCost]);

  return (
    <div ref={costRef} className="mt-[8px]">
      <AmountInput
        value={phoneCost}
        onChange={handlePhoneCost}
        inputWidth="w-full"
        divWidth="w-[320px]"
        onlyRead={false}
        placeholder="$ Costo en COP"
        label="Costo en COP"
      />
    </div>
  );
};
