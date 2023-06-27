import FilterData from "./components/FilterData/FilterData";
import Counter from "./components/Counter/Counter";
import ReactSelect from "./components/ReactSelect/ReactSelect";
import { FiturKeranjang } from "./components/FiturKeranjangBelanja/FiturKeranjang";
function App() {
  return (
    <div>
      <h1 className="text-center text-4xl uppercase mb-4 font-semibold">Tes coding front end developer</h1>
      <FilterData />
      <Counter />
      <ReactSelect />
      <FiturKeranjang />
    </div>
  );
}

export default App;
