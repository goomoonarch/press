/* eslint-disable react/prop-types */
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { AmountInput } from "./AmountInput";
import { userSimulator } from "../utils";

const aval = 0.1;
const percentMonth = 0.04;

export const UserInfo = ({ inputs }) => {
  const { aRs, c2c, inter, mCuota, mItab, pTc, phoneV, wCuota, wItab } =
    userSimulator(inputs);

  const avalRef = useRef(null);
  const dispRef = useRef(null);
  const percentMonthRef = useRef(null);

  useEffect(() => {
    gsap.to(avalRef.current, {
      opacity: 0.75,
      y: -20,
      duration: 0.3,
    });
    gsap.to(percentMonthRef.current, {
      opacity: 0.75,
      y: -20,
      duration: 0.3,
    });
  }, []);

  return (
    <div ref={dispRef} className="flex flex-col  mt-8">
      <div className="flex justify-between">
        <div
          className={`bg-[#f6f6f6] w-[74px] mr-[8px] rounded-[6px] flex justify-center`}
        >
          <div
            ref={avalRef}
            className="absolute translate-x-[-22px] text-[14px] font-neue opacity-0 text-[#444444] -z-10"
          >
            Aval
          </div>
          <input
            type="text"
            id="aval"
            value={`${aval * 100}%`}
            readOnly
            className="bg-[#f6f6f6] w-[40px] h-[35px] text-center font-neue focus:outline-none tracking-[.16em]"
          />
        </div>
        <AmountInput
          value={aRs}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={true}
          placeholder="$ Capital a crédito en COP"
          label="S. Todo riesgo COP"
        />
        <div
          className={`bg-[#f6f6f6] w-[74px] ml-[8px] rounded-[6px] flex justify-center`}
        >
          <div
            ref={percentMonthRef}
            className="absolute translate-x-[-8px] text-[14px] font-neue opacity-0 text-[#444444] -z-10"
          >
            Interés/M
          </div>
          <input
            type="text"
            id="percentmoth"
            value={`${percentMonth * 100}%`}
            readOnly
            className="bg-[#f6f6f6] w-[40px] h-[35px] text-center font-neue focus:outline-none tracking-[.16em]"
          />
        </div>
      </div>
      <div className="flex justify-between mt-[24px]">
        <AmountInput
          value={c2c}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={true}
          placeholder="$ Capital a crédito en COP"
          label="Cap. a crédito en COP"
        />
        <AmountInput
          value={inter}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={true}
          placeholder="$ Interés en COP"
          label="Interés en COP"
        />
      </div>
      <div className="flex justify-between mt-[24px]">
        <AmountInput
          value={pTc}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={true}
          placeholder="$ Pago T. crédito en COP"
          label="Pago T. crédito en COP"
        />
        <AmountInput
          value={phoneV}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[156px]"
          onlyRead={true}
          placeholder="$ Valor del teléfono en COP"
          label="V. Teléfono en COP"
        />
      </div>
    </div>
  );
};
