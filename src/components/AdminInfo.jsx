/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { formatDays, userSimulator } from "../utils";
import { AmountInput } from "./AmountInput";
import gsap from "gsap";

export const AdminInfo = ({ inputs }) => {
  const cReturnRef = useRef(null);
  const percentMonthRef = useRef(null);

  useEffect(() => {
    gsap.to(cReturnRef.current, {
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

  const {
    rReturn,
    cReturn,
    bProfit,
    pRisk,
    agentP,
    pitf,
    realP,
    mProfit,
    wProfit,
  } = userSimulator(inputs);

  return (
    <div className="flex flex-col">
      <div className="flex mt-[24px] justify-between">
        <AmountInput
          value={rReturn}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[120px]"
          onlyRead={true}
          placeholder="$ Recuperar"
          label="F. Recuperar COP"
        />
        <div
          className={`bg-[#f6f6f6] w-[192px] ml-[8px] rounded-[6px] flex justify-center`}
        >
          <div
            ref={cReturnRef}
            className="absolute translate-x-[-14px] text-[14px] font-neue opacity-0 text-[#444444] -z-10"
          >
            Tiempo de retorno Capital
          </div>
          <input
            type="text"
            id="days"
            value={formatDays(cReturn)}
            readOnly
            className="bg-[#f6f6f6] text-[#444444] w-[140px] h-[35px] text-start font-neue focus:outline-none"
          />
        </div>
      </div>
      <br />
      <div className="flex flex-col mt-[24px]">
        <div className="flex justify-between">
          <AmountInput
            value={bProfit}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[238px]"
            onlyRead={true}
            placeholder="$ Profit"
            label="Ganancia bruta en COP"
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
              value="4%"
              readOnly
              className="bg-[#f6f6f6] w-[40px] h-[35px] text-center font-neue focus:outline-none tracking-[.16em] text-[#444444]"
            />
          </div>
        </div>

        <div className="flex justify-between mt-[24px]">
          <AmountInput
            value={50000}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[156px]"
            onlyRead={true}
            placeholder=""
            label="Gasto teléfono COP"
          />
          <AmountInput
            value={pRisk}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[156px]"
            onlyRead={true}
            placeholder=""
            label="Riesgo de pérdida COP"
          />
        </div>
        <div className="flex justify-between mt-[24px]">
          <AmountInput
            value={agentP}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[156px]"
            onlyRead={true}
            placeholder=""
            label="Pago agente en COP"
          />
          <AmountInput
            value={pitf}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[156px]"
            onlyRead={true}
            placeholder=""
            label="Pago de interés Cap. F"
          />
        </div>
      </div>
      <br />
      <div className="flex flex-col">
        <AmountInput
          value={realP}
          onChange={() => {}}
          inputWidth="w-full"
          divWidth="w-[320px]"
          onlyRead={true}
          placeholder=""
          label="Ganancia en COP"
        />
        <div className="flex justify-between mt-[24px]">
          <AmountInput
            value={mProfit}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[156px]"
            onlyRead={true}
            placeholder=""
            label="G. Mensual en COP"
          />
          <AmountInput
            value={wProfit}
            onChange={() => {}}
            inputWidth="w-full"
            divWidth="w-[156px]"
            onlyRead={true}
            placeholder=""
            label="G. Semanal en COP"
          />
        </div>
      </div>
      <br />
    </div>
  );
};
