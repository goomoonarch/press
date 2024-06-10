import { useState, useEffect } from "react";

const CreditSimulator = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueRaw, setInputValueRaw] = useState("");
  const [optionalAmount, setOptionalAmount] = useState("");
  const [optionalAmountRaw, setOptionalAmountRaw] = useState("");
  const [installmentsType, setInstallmentsType] = useState("select"); // 'select' or 'input'
  const [installmentsValue, setInstallmentsValue] = useState(6);
  const [halfAmount, setHalfAmount] = useState("");
  const [halfAmountRaw, setHalfAmountRaw] = useState("");
  const [capitalToCredit, setCapitalToCredit] = useState("");
  const [allRiskSecure, setAllRiskSecure] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [interest, setInterest] = useState("");
  const [payTotalCredit, setPayTotalCredit] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [monthlyInterestTab, setMonthlyInterestTab] = useState("");
  const [weekelyInterest, setWeekelyInterest] = useState("");
  const [monthlyCuota, setMonthlyCuota] = useState("");
  const [weekelyCuota, setWeekelyCuota] = useState("");

  const tenPercent = 0.1;
  const monthlyInterest = 0.04;

  const formatCOP = (value) => {
    if (!value) return "";
    const numberValue = parseInt(value, 10);
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberValue);
  };

  const handleInputChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setInputValueRaw(value);
    setInputValue(formatCOP(value));
    if (value && value > 0) {
      const half = Math.floor(value / 2);
      setHalfAmountRaw(half.toString());
      setHalfAmount(formatCOP(half.toString()));
    } else {
      setHalfAmountRaw("");
      setHalfAmount("");
    }
  };

  const handleOptionalAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setOptionalAmountRaw(value);
    setOptionalAmount(formatCOP(value));
  };

  const handleInstallmentsChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setInstallmentsValue(value);
  };

  const toggleInstallmentsType = () => {
    setInstallmentsType((prevType) =>
      prevType === "select" ? "input" : "select"
    );
  };

  const calculateResult = () => {
    const amount = parseInt(inputValueRaw, 10) || 0;
    const half = parseInt(halfAmountRaw, 10) || 0;
    const optional = parseInt(optionalAmountRaw, 10) || 0;
    const installments = parseInt(installmentsValue, 10) || 0;

    if (amount === 0 || half + optional > amount) {
      return;
    }

    const capitalToCredit = amount - half - optional;
    const allRiskSecure = installments * 5320;
    const totalInterest = installments * monthlyInterest + tenPercent;
    const interest = totalInterest * capitalToCredit;
    const payTotalCredit = capitalToCredit + allRiskSecure + interest;
    const phoneValue = amount + interest;
    const monthlyInterestTab = interest / installments;
    const weekelyInterest = monthlyInterestTab / 4;
    const monthlyCuota = payTotalCredit / installments;
    const weekelyCuota = monthlyCuota / 4;

    setCapitalToCredit(formatCOP(capitalToCredit.toString()));
    setAllRiskSecure(formatCOP(allRiskSecure.toString()));
    setTotalInterest((totalInterest * 100).toFixed(2));
    setInterest(formatCOP(interest.toString()));
    setPayTotalCredit(formatCOP(payTotalCredit.toString()));
    setPhoneValue(formatCOP(phoneValue.toString()));
    setMonthlyInterestTab(formatCOP(monthlyInterestTab.toString()));
    setWeekelyInterest(formatCOP(weekelyInterest.toString()));
    setMonthlyCuota(formatCOP(monthlyCuota.toString()));
    setWeekelyCuota(formatCOP(weekelyCuota.toString()));
  };

  useEffect(() => {
    calculateResult();
  }, [inputValueRaw, optionalAmountRaw, installmentsValue]);

  return (
    <div>
      <div>
        <label htmlFor="amount">Monto de la compra:</label>
        <input
          type="text"
          id="amount"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingrese el monto en COP"
          aria-label="Monto de la compra"
        />
      </div>

      <div>
        <label htmlFor="halfAmount">Monto mínimo:</label>
        <input
          type="text"
          id="halfAmount"
          value={halfAmount}
          readOnly
          aria-label="La mitad del monto"
        />
      </div>

      <div>
        <label htmlFor="optionalAmount">Monto opcional:</label>
        <input
          type="text"
          id="optionalAmount"
          value={optionalAmount}
          onChange={handleOptionalAmountChange}
          placeholder="Ingrese el monto opcional en COP"
          aria-label="Monto opcional"
        />
      </div>

      <div>
        <label htmlFor="installments">Número de cuotas:</label>
        <button
          onClick={toggleInstallmentsType}
          aria-label="Cambiar tipo de entrada de cuotas"
        >
          Cambiar a{" "}
          {installmentsType === "select"
            ? "input numérico"
            : "select de cuotas"}
        </button>
        {installmentsType === "select" ? (
          <select
            id="installments"
            value={installmentsValue}
            onChange={handleInstallmentsChange}
            aria-label="Número de cuotas"
          >
            {[...Array(6).keys()].map((i) => (
              <option key={i} value={2 + i * 2}>
                {2 + i * 2}
              </option>
            ))}
            <option value="14">14</option>
            <option value="24">24</option>
          </select>
        ) : (
          <input
            type="text"
            id="installments"
            value={installmentsValue}
            onChange={handleInstallmentsChange}
            placeholder="Ingrese el número de cuotas"
            pattern="\d*"
            aria-label="Número de cuotas"
          />
        )}
      </div>

      {capitalToCredit && (
        <div>
          <br />
          <div>
            <label htmlFor="capitalToCredit">Capital a crédito:</label>
            <input
              type="text"
              id="capitalToCredit"
              value={capitalToCredit}
              readOnly
              aria-label="Resultado"
            />
          </div>
          <label htmlFor="allRiskSecure">Aval: 10%</label>
          <div>
            <label htmlFor="allRiskSecure">Seguro todo riesgo:</label>
            <input
              type="text"
              id="allRiskSecure"
              value={allRiskSecure}
              readOnly
              aria-label="Seguro todo riesgo"
            />
          </div>
          <div>
            <label htmlFor="monthlyInterest">Interés mensual:</label>
            <input
              type="text"
              id="monthlyInterest"
              value={`${monthlyInterest * 100}%`}
              readOnly
              aria-label="Interés mensual"
            />
          </div>
          <div>
            <label htmlFor="totalInterest">Total de interés:</label>
            <input
              type="text"
              id="totalInterest"
              value={`${totalInterest}%`}
              readOnly
              aria-label="Total interés"
            />
          </div>
          <div>
            <label htmlFor="interest">Interés:</label>
            <input
              type="text"
              id="interest"
              value={interest}
              readOnly
              aria-label="Interés"
            />
          </div>
          <div>
            <label htmlFor="payTotalCredit">Pago total a crédito:</label>
            <input
              type="text"
              id="payTotalCredit"
              value={payTotalCredit}
              readOnly
              aria-label="Pago total a crédito"
            />
          </div>
          <div>
            <label htmlFor="phoneValue">Valor del teléfono:</label>
            <input
              type="text"
              id="phoneValue"
              value={phoneValue}
              readOnly
              aria-label="Valor del teléfono"
            />
          </div>
          <div>
            <br />
            <td>
              <tr></tr>
              <tr>Pago mensual</tr>
              <tr>pago semanal</tr>
            </td>
            <td>
              Interés
              <tr>{monthlyInterestTab}</tr>
              <tr>{weekelyInterest}</tr>
            </td>
            <td>
              Cuota
              <tr>{monthlyCuota}</tr>
              <tr>{weekelyCuota}</tr>
            </td>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditSimulator;
