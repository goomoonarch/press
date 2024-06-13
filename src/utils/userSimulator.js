/**const restReturn = phoneCostValue - half - optional;
      const capitalReturn =
        monthlyCuota !== 0 ? (restReturn / monthlyCuota).toFixed(2) : "0.00";
      const brutalProfit = phoneValue - phoneCostValue;
      const phoneRisk = capitalToCredit * 0.25;
      const agentPay = amount * 0.14;
      const payInterestToFlor = restReturn * 0.0225 * installmentsValue;
      const realProfit =
        brutalProfit - phoneRisk - agentPay - payInterestToFlor - phoneExpense;
      const monthlyProfit = realProfit / installmentsValue;
      const weeklyProfit = monthlyProfit / 4; */


export const userSimulator = ({ amount, months, optionalAmount, phoneCost }) => {

  let c2c = amount - amount * 0.5 - optionalAmount;
  let aRs = months * 5320;
  let Ti = months * 0.04 + 0.1; //---> adminMode
  let inter = Ti * c2c;
  let pTc = c2c + aRs + inter;
  let phoneV = parseInt(amount) + inter;

  //----> This is for the Tab
  let mItab = inter / months;
  let wItab = mItab / 4;
  let mCuota = pTc / months;
  let wCuota = mCuota / 4;

  //----->This is for the adminMode
  let rReturn = phoneCost - amount / 2 - optionalAmount;
  let cReturn = months !== 0 ? (rReturn / mCuota).toFixed(2) : "0.00";
  let bProfit = phoneV - phoneCost;
  let pRisk = c2c * 0.25;




  return {
    c2c,
    aRs,
    Ti,
    inter,
    pTc,
    phoneV,
    mItab,
    wItab,
    mCuota,
    wCuota,
    rReturn,
    cReturn,
    bProfit,
    pRisk,
  };
};
