import React, { useEffect, useState } from "react";
import "./CountryList.css";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="country-list">
      {countries.map((country, index) => (
        <div key={index} className="country-item">
          <img src={country.flag} alt={`${country.name} flag`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
