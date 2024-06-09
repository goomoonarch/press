import { useState } from "react";

const CreditSimulator = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueRaw, setInputValueRaw] = useState("");
  const [optionalAmount, setOptionalAmount] = useState("");
  const [optionalAmountRaw, setOptionalAmountRaw] = useState("");
  const [installmentsType, setInstallmentsType] = useState("select"); // 'select' or 'input'
  const [installmentsValue, setInstallmentsValue] = useState(2);
  const [halfAmount, setHalfAmount] = useState("");
  const [halfAmountRaw, setHalfAmountRaw] = useState("");
  const [capitalToCredit, setCapitalToCredit] = useState("");
  const [allRisckSecure, setAllRisckSecure] = useState("");
  
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
    const capitalToCredit = amount - half - optional;
    const allRisckSecure = installmentsValue * 5320;
    console.log(installmentsValue);
    setCapitalToCredit(formatCOP(capitalToCredit.toString()));
    setAllRisckSecure(formatCOP(allRisckSecure.toString()))
  };

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

      <button onClick={calculateResult}>Calcular</button>

      {capitalToCredit && (
        <div>
          <div>
            <label htmlFor="capitalToCreditFixed">Capital a crédito fixed:</label>
            <input
              type="text"
              id="capitalToCredit"
              value={capitalToCredit}
              readOnly
              aria-label="Resultado"
            />
          </div>
          <label htmlFor="alvalPercent">Aval: 10%</label>
          <div>
            <label htmlFor="allRisckSecure">Seguro todo riesgo:</label>
            <input
              type="text"
              id="allrisksecure"
              value={allRisckSecure}
              readOnly
              aria-label="Seguro todo riesgo"
            />
          </div>
          <div>
          <label htmlFor="monthlyInterest">Interes mensual:</label>
          <input
          type="text"
          id="monthlyinterest"
          value={`${monthlyInterest * 100}%`}
          readOnly
          aria-label="Interes mensual" />
          </div>
          <div>
            <label htmlFor="totalInterest">Total de interés</label>
            <input
            type="text"
            id="totalInterest"
            readOnly
            aria-label="Total interes" />
          </div>
          
          
        </div>
      )}
    </div>
  );
};

export default CreditSimulator;
