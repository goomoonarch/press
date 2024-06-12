/* eslint-disable react/prop-types */
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { lockicon, unlockicon } from "../assets";

export const UnlockAdmin = ({ onAdminMode }) => {
  const toggle = useRef(null);
  const lockIconRef = useRef(null);
  const unlockIconRef = useRef(null);
  const passRef = useRef(null);
  const [adminMode, setAdminMode] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (adminMode) {
      gsap.to(toggle.current, {
        x: 18,
        backgroundColor: "#F2CB57",
        duration: 0.15,
        ease: "power2.inOut",
      });
      gsap.to(lockIconRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.inOut",
      });
      gsap.to(unlockIconRef.current, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(toggle.current, {
        x: 6,
        backgroundColor: "#d9d9d9",
        duration: 0.15,
        ease: "power2.inOut",
      });
      gsap.to(lockIconRef.current, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.inOut",
      });
      gsap.to(unlockIconRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.inOut",
      });
    }
  }, [adminMode]);

  const handleAdminMode = () => {
    if (!adminMode) {
      gsap.to(toggle.current, {
        x: 12,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(toggle.current, {
            x: 6,
            duration: 0.1,
            ease: "bounce.out",
          });
        },
      });

      if (!showPasswordInput) {
        setShowPasswordInput(true);

        gsap.fromTo(
          passRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(passRef.current, {
          x: 250,
          duration: 0.1,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 5,
        });
      }
    } else {
      setAdminMode(false);
      onAdminMode(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "2505") {
      gsap.to(passRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "back.in(1.7)",
        onComplete: () => {
          setAdminMode(true);
          onAdminMode(true);
          setShowPasswordInput(false);
          setPassword("");
        },
      });
    } else {
      setPassword("");
      gsap.to(passRef.current.querySelector("input"), {
        borderColor: "#FF0000",
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
        x: -10,
        onComplete: () => {
          gsap.to(passRef.current.querySelector("input"), {
            borderColor: "#F2CB57",
            duration: 0.1,
          });
        },
      });
    }
  };

  return (
    <div>
      <div
        ref={passRef}
        className="absolute translate-y-[-32px] translate-x-[240px]"
      >
        {showPasswordInput && (
          <form
            onSubmit={handlePasswordSubmit}
            className="flex justify-end mb-2"
          >
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              maxLength={4}
              className="bg-[#f6f6f6] rounded-[6px] w-[80px] text-[#444444] text-center opacity-55 font-neue font-bold focus:outline-none focus:ring-2 focus:ring-[#F2CB57] tracking-[.40em]"
              style={{ caretColor: "transparent" }}
            />
          </form>
        )}
      </div>

      <div className="flex items-center w-[320px] mb-2 justify-end">
        <div className="flex items-center mr-[20px]">
          <img
            ref={lockIconRef}
            src={lockicon}
            alt="lockicon"
            className="mr-2"
            style={{ position: "absolute", opacity: 1 }}
          />
          <img
            ref={unlockIconRef}
            src={unlockicon}
            alt="unlockicon"
            className="mr-2"
            style={{ position: "absolute", opacity: 0 }}
          />
        </div>
        <div onClick={handleAdminMode}>
          <div className="bg-[#f6f6f6] w-[40px] h-[20px] rounded-full flex items-center">
            <div
              ref={toggle}
              className="bg-[#d9d9d9] w-[16px] h-[12px] rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
