import { useState } from "react";
import "./styles.css";

export default function App() {
  let [x, setX] = useState(1);
  return (
    <div className="App">
      <h1>Hello - {x}</h1>
      <button onClick={() => setX(x + 1)}>+</button>
    </div>
  );
}
