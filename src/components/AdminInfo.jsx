/* eslint-disable react/prop-types */
import { userSimulator } from "../utils";

export const AdminInfo = ({ inputs }) => {
  const outputs = userSimulator(inputs);
  console.log(outputs);
  return <div>AdminInfo</div>;
};
