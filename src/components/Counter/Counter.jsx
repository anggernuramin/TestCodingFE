import { useState } from "react";
import ButtonCounter from "./ButtonCounter";
export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }
  function reset() {
    setCount(0);
  }

  //   validasi count
  if (count < 0) {
    setCount(0);
  }

  return (
    <>
      <h2 className="text-2xl text-red-600 mt-10">2. Tes Coding Counter</h2>
      <ButtonCounter onClick={decrement}>-</ButtonCounter>
      <span className="mx-3">{count}</span>
      <ButtonCounter onClick={increment}>+</ButtonCounter>
      <br />
      <ButtonCounter onClick={reset}>Reset!</ButtonCounter>
    </>
  );
}
