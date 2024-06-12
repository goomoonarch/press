import { useState } from "react";
import { Hero } from "./Hero";
import { InputValue } from "./InputValue";
import { UnlockAdmin } from "./UnlockAdmin";

export const Stylized = () => {
  const [adminMode, setAdminMode] = useState(false);
  const [amount, setAmount] = useState("");

  const handleAdminMode = (adminState) => setAdminMode(adminState);
  const handleAmountValue = (amountValue) => setAmount(amountValue);

  console.log(adminMode);
  console.log(amount);

  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <UnlockAdmin onAdminMode={handleAdminMode} />
      <InputValue onChangeUserInputs={handleAmountValue}/>
    </div>
  );
};
