import { useState } from "react";
function ChangeCar() {
  const [carValue, setCarValue] = useState("");

  return (
    <input
      type="text"
      value={carValue}
      onChange={(e) => setCarValue(e.target.value)}
    ></input>
  );
}

export default ChangeCar;
