export const userSimulator = ({
  amount,
  months,
  optionalAmount,
  phoneCost,
}) => {
  const validateValue = (value) =>
    isNaN(value) || !isFinite(value) ? 0 : value;

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
  let agentP = amount * 0.14;
  let pitf = rReturn * 0.0225 * months;
  let realP = bProfit - pRisk - agentP - pitf - 50000;
  let mProfit = realP / months;
  let wProfit = mProfit / 4;

  return {
    c2c: validateValue(c2c),
    aRs: validateValue(aRs),
    Ti: validateValue(Ti),
    inter: validateValue(inter),
    pTc: validateValue(pTc),
    phoneV: validateValue(phoneV),
    mItab: validateValue(mItab),
    wItab: validateValue(wItab),
    mCuota: validateValue(mCuota),
    wCuota: validateValue(wCuota),
    rReturn: validateValue(rReturn),
    cReturn: validateValue(cReturn),
    bProfit: validateValue(bProfit),
    pRisk: validateValue(pRisk),
    agentP: validateValue(agentP),
    pitf: validateValue(pitf),
    realP: validateValue(realP),
    mProfit: validateValue(mProfit),
    wProfit: validateValue(wProfit),
  };
};
