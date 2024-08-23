import React, { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();
        setConvertedAmount(data.rates[toCurrency]);
      } catch (error) {
        console.error("Error:", error);
        setConvertedAmount(null);
      }
    };

    if (fromCurrency && toCurrency) {
      fetchConversionRate();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        OUTPUT:{" "}
        {convertedAmount !== null
          ? `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
          : "Please enter amount and select currencies."}
      </p>
    </div>
  );
}
