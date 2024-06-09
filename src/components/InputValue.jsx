import { useState } from "react";

export const InputValue = ({ onChange }) => {
  const [phoneValue, setPhoneValue] = useState("");

  const onInputChange = ({ target }) => {
    setPhoneValue(target.value);
    onChange(target.value);
    console.log(target.value);
  };

  return (
    <div className="flex w-[250px] sm:w-[300px]">
      <input
          type="text"
          placeholder="Número de documento"
          className="bg-[#f6f6f6] px-2 focus:outline-none font-Inter text-[#1C1C1E] sm:w-[270px] w-[250px]"
          value={phoneValue}
          onChange={onInputChange}
      />
    </div>
  );
};
