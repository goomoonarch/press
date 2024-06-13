export const userSimulator = ({ amount, months, optionalAmount }) => {
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
  };
};
