import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { Hero } from "./Hero";
import { InputValues } from "./InputValues";
import { UnlockAdmin } from "./UnlockAdmin";
import { PhoneCost } from "./PhoneCost";
import { UserInfo } from "./UserInfo";
import { Fotter } from "./Fotter";
import { saveprint } from "../assets";
import { AdminInfo } from "./AdminInfo";

export const Stylized = () => {
  const [adminMode, setAdminMode] = useState(false);
  const [initInputs, setInitInputs] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [phoneCost, setPhoneCost] = useState(0);
  const [showPhoneCost, setShowPhoneCost] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const captureRef = useRef(null);

  const handleAdminMode = (adminState) => setAdminMode(adminState);
  const handleAmountValue = (initialInputs) => {
    setInitInputs(initialInputs);
    const { amount } = initialInputs;
    if (amount !== "") {
      setShowUserInfo(true);
    } else {
      setShowUserInfo(false);
    }
  };
  const handlePhoneCost = (phoneCost) => {
    setPhoneCost(phoneCost);
    if (phoneCost !== "") {
      setShowAdminInfo(true);
    } else {
      setShowAdminInfo(false);
    }
  };

  useEffect(() => {
    if (adminMode) {
      setShowPhoneCost(true);
    }
  }, [adminMode]);

  const handleCaptureClick = () => {
    const element = captureRef.current;
    html2canvas(element, {
      scale: 2,
      width: element.offsetWidth,
      height: element.offsetHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");

        const date = new Date();
        const timestamp = date.toLocaleString("en-GB").replace(/[/,: ]/g, "_");
        const fileName = `screenshot_${timestamp}.png`;

        link.href = imgData;
        link.download = fileName;
        link.click();
      })
      .catch((err) => {
        console.error("Error capturing screenshot: ", err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div ref={captureRef} className="px-3">
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
        {(adminMode && showAdminInfo) && <AdminInfo inputs={{ ...initInputs, phoneCost }} />}
        {showUserInfo && <UserInfo inputs={initInputs} />}
        {showUserInfo && (
          <button
            onClick={handleCaptureClick}
            className="mt-2 bg-[#f6f6f6] rounded-[6px] hover:ring-2 hover:ring-[#F2CB57] focus:ring-2 focus:ring-[#F2CB57] transition duration-150"
          >
            <div className="w-[52px] h-[40px] flex justify-center items-center">
              <img src={saveprint} alt="saveprint" />
            </div>
          </button>
        )}
        <Fotter />
      </div>
    </div>
  );
};
