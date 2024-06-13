import { Stylized } from "./components/Stylized";
import { CreditSimulator } from "./components/CreditSumulator";

function App() {
  return (
    <div className="flex">
      <CreditSimulator />
      <Stylized />
    </div>
  );
}

export default App;
