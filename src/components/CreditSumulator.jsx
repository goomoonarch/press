import { useState, useEffect } from "react";

export const CreditSimulator = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueRaw, setInputValueRaw] = useState("");
  const [optionalAmount, setOptionalAmount] = useState(0);
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

  //Admin mode
  const [adminMode, setAdminMode] = useState(false);
  const [phoneCost, setPhoneCost] = useState("");
  const [restReturn, setRestReturn] = useState("");
  const [capitalReturn, setCapitalReturn] = useState("");
  const [brutalProfit, setBrutalProfit] = useState("");
  const [phoneRisk, setPhoneRisk] = useState("");
  const [agentPay, setAgentPay] = useState("");
  const [interestPayToFlor, setInterestPayToFlor] = useState("");
  const [realProfit, setRealProfit] = useState("");
  const [monthlyProfit, setMonthlyProfit] = useState("");
  const [weeklyProfit, setWeeklyProfit] = useState("");

  const tenPercent = 0.1;
  const monthlyInterest = 0.04;
  const phoneExpense = 50000;

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

  const handlePhoneCost = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setPhoneCost(value);
  };

  const handleAdminMode = () => {
    if (
      inputValueRaw &&
      optionalAmountRaw &&
      installmentsValue &&
      parseInt(installmentsValue, 10) > 0
    ) {
      const password = prompt("Ingrese la contraseña para Admin Mode:");
      if (password === "2505") {
        setAdminMode(true);
      } else {
        alert("Contraseña incorrecta.");
      }
    } else {
      alert(
        "Por favor, complete todos los campos antes de ingresar al modo administrador."
      );
    }
  };

  const calculateResult = () => {
    const amount = parseInt(inputValueRaw, 10) || 0;
    const half = parseInt(halfAmountRaw, 10) || 0;
    const optional = parseInt(optionalAmountRaw, 10) || 0;
    const installments = parseInt(installmentsValue, 10) || 0;
    const phoneCostValue = parseInt(phoneCost, 10) || 0;

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

    if (adminMode && phoneCostValue > 0) {
      const restReturn = phoneCostValue - half - optional;
      const capitalReturn =
        monthlyCuota !== 0 ? (restReturn / monthlyCuota).toFixed(2) : "0.00";
      const brutalProfit = phoneValue - phoneCostValue;
      const phoneRisk = capitalToCredit * 0.25;
      const agentPay = amount * 0.14;
      const payInterestToFlor = restReturn * 0.0225 * installmentsValue;
      const realProfit =
        brutalProfit - phoneRisk - agentPay - payInterestToFlor - phoneExpense;
      const monthlyProfit = realProfit / installmentsValue;
      const weeklyProfit = monthlyProfit / 4;

      setRestReturn(formatCOP(restReturn.toString()));
      setCapitalReturn(capitalReturn);
      setBrutalProfit(formatCOP(brutalProfit.toString()));
      setPhoneRisk(formatCOP(phoneRisk.toString()));
      setAgentPay(formatCOP(agentPay.toString()));
      setInterestPayToFlor(formatCOP(payInterestToFlor.toString()));
      setRealProfit(formatCOP(realProfit.toString()));
      setMonthlyProfit(formatCOP(monthlyProfit.toString()));
      setWeeklyProfit(formatCOP(weeklyProfit.toString()));
    }
  };

  useEffect(() => {
    calculateResult();
  }, [
    inputValueRaw,
    optionalAmountRaw,
    installmentsValue,
    phoneCost,
    adminMode,
  ]);

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleAdminMode}>Admin Mode</button>
      <div>
        <label htmlFor="amount">Monto de la compra:</label>
        <input
          className="bg-[#F6F6F6] rounded-[8px] px-2"
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
      {adminMode && (
        <div>
          <br />
          <label htmlFor="cost">Costo:</label>
          <input
            type="text"
            id="phonecost"
            value={formatCOP(phoneCost)}
            onChange={handlePhoneCost}
            placeholder="Costo del teléfono en COP"
          />
          <div>
            <label htmlFor="restunr">Faltante por recuperar:</label>
            <input type="text" id="restReturn" value={restReturn} readOnly />
          </div>
          <div>
            <label htmlFor="capitalreturn">Retorno de capital: </label>
            <input
              type="text"
              id="capitalreturn"
              value={capitalReturn}
              readOnly
            />
          </div>
          <br />
          <div>
            <label htmlFor="profit">Ganancia bruta: </label>
            <input type="text" id="profit" value={brutalProfit} readOnly />
          </div>
          <div>
            <label htmlFor="phoneexpense">Gasto del teléfono: </label>
            <input
              type="text"
              id="phoneexpense"
              value={formatCOP(phoneExpense)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="phonerisk">Resgo de pérdida: </label>
            <input type="text" id="phonerisk" value={phoneRisk} readOnly />
          </div>
          <div>
            <label htmlFor="agentpay">Pago agente: </label>
            <input type="text" id="agentpay" value={agentPay} readOnly />
          </div>
          <div>
            <label htmlFor="interestpaytoflor">Payments Interets: </label>
            <input
              type="text"
              id="isterestPayToFlor"
              value={interestPayToFlor}
              readOnly
            />
          </div>
          <br />
          <div>
            <label htmlFor="realProfit">Ganancia: </label>
            <input type="text" id="realProfit" value={realProfit} readOnly />
          </div>
          <div>
            <label htmlFor="monthlyProfit">Ganancia Mensual: </label>
            <input
              type="text"
              id="monthlyProfit"
              value={monthlyProfit}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="weeklyProfit">Ganancia Semanal: </label>
            <input
              type="text"
              id="weeklyProfit"
              value={weeklyProfit}
              readOnly
            />
          </div>
        </div>
      )}

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
          {adminMode && (
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
          )}
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
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td>Pago mensual</td>
                  <td>pago semanal</td>
                </tr>
                <tr>
                  <td>Interés</td>
                  <td>{monthlyInterestTab}</td>
                  <td>{weekelyInterest}</td>
                </tr>
                <tr>
                  <td>Cuota</td>
                  <td>{monthlyCuota}</td>
                  <td>{weekelyCuota}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditSimulator;
