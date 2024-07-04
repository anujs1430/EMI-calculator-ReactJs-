import { useEffect, useState } from "react";

const App = () => {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [emi, setEmi] = useState(0);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);

    if (id === "principal") {
      setPrincipal(value);
    } else if (id === "interest") {
      setInterest(value);
    } else {
      setYears(value);
    }
  };

  //P(r(1+r)^n/((1+r)^n)-1))
  const calculate = () => {
    let r = interest;
    r = r / 12 / 100; //per month

    if (principal && r && years) {
      const calcPower = Math.pow(1 + r, years * 12);
      const amount = principal * ((r * calcPower) / (calcPower - 1));
      setEmi(Math.round(amount));
    }
  };

  useEffect(() => {
    calculate();
  }, [principal, interest, years]);

  return (
    <div className="loan-calculator">
      <h1>EMI Calculator</h1>
      <div className="inputs">
        <p>Principal:</p>
        <input type="number" id="principal" min={0} onChange={handleChange} />

        <p>Interest:</p>
        <input type="number" id="interest" onChange={handleChange} />

        <p>Years:</p>
        <input type="number" id="years" onChange={handleChange} />
      </div>
      <div className="output">
        Your EMI is {emi ? "₹" : ""}
        {emi}
      </div>
    </div>
  );
};

export default App;
