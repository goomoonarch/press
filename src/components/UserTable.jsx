import { useEffect, useRef } from "react";
import gsap from "gsap";
import { dollar } from "../assets";
import { formatCOP } from "../utils";

/* eslint-disable react/prop-types */
export const UserTable = ({ info }) => {
  const { mCuota, mItab, wCuota, wItab } = info;
  const tableRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      tableRef.current.children,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        delay: 0.4,
        ease: "power3.out",
        stagger: 0.1,
      }
    );
  }, []);

  return (
    <div className="flex flex-col font-neue text-[#444444] ">
      <div className="opacity-75 text-[14px]">Tabla de pagos</div>
      <div
        ref={tableRef}
        className="flex flex-col bg-[#FDFDFD] rounded-[8px] p-2 ring-2 ring-[#f2cb577d]"
      >
        <div className="flex items-center justify-between">
          <div className="h-[24px] w-[60.5px] flex items-end">
          <img
            src={dollar}
            alt="dollarfillicon"
            className="h-[24px] w-[24px]"
          />
          </div>
 
          <div className="h-[24px] w-[113px] ml-[8px] flex items-end text-[15px]">
            Pago Mensual
          </div>
          <div className="h-[24px] w-[113px] ml-[8px] flex items-end text-[15px]">
            Pago Semanal
          </div>
        </div>
        <div className="flex items-center justify-between mb-[8px]">
          <div className="h-[35px] w-[60.8px] flex items-end justify-start text-[15px]">
            Interés
          </div>
          <div className="h-[35px] w-[113px] ml-[8px] bg-[#f6f6f6] rounded-[6px] tracking-[.16em] flex items-center pl-[10px]">
            {formatCOP(mItab)}
          </div>
          <div className="h-[35px] w-[113px] ml-[8px] bg-[#f6f6f6] rounded-[6px] tracking-[.16em] flex items-center pl-[10px]">
            {formatCOP(wItab)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-[35px] w-[60.8px] flex items-end justify-start text-[15px]">
            Cuota
          </div>
          <div className="h-[35px] w-[113px] ml-[8px] bg-[#f6f6f6] rounded-[6px] tracking-[.16em] flex items-center pl-[10px]">
            {formatCOP(mCuota)}
          </div>
          <div className="h-[35px] w-[113px] ml-[8px] bg-[#f6f6f6] rounded-[6px] tracking-[.16em] flex items-center pl-[10px]">
            {formatCOP(wCuota)}
          </div>
        </div>
      </div>
    </div>
  );
};
