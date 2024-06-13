import { useState, useEffect } from "react";
import { Hero } from "./Hero";
import { InputValues } from "./InputValues";
import { UnlockAdmin } from "./UnlockAdmin";
import { PhoneCost } from "./PhoneCost";
import { UserInfo } from "./UserInfo";

export const Stylized = () => {
  const [adminMode, setAdminMode] = useState(false);
  const [initInputs, setInitInputs] = useState({});
  const [phoneCost, setPhoneCost] = useState(0);
  const [showPhoneCost, setShowPhoneCost] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleAdminMode = (adminState) => setAdminMode(adminState);
  const handleAmountValue = (initialInputs) => {
    setInitInputs(initialInputs);
    const { amount } = initialInputs;
    if (amount !== "" ) {
      setShowUserInfo(true);
    } else {
      setShowUserInfo(false);
    }
  };
  const handlePhoneCost = (phoneCost) => setPhoneCost(phoneCost);

  useEffect(() => {
    if (adminMode) {
      setShowPhoneCost(true);
    }
  }, [adminMode]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <UnlockAdmin onAdminMode={handleAdminMode} />
      <InputValues onChangeUserInputs={handleAmountValue} />
      {showPhoneCost && (
        <PhoneCost
          adminState={adminMode}
          onChangePhoneCost={handlePhoneCost}
          onAnimationComplete={() => setShowPhoneCost(false)}
        />
      )}
      {showUserInfo && <UserInfo inputs={initInputs} />}
    </div>
  );
};
