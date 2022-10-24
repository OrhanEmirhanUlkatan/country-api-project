import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function App() {
  const [countries, setCountries] = useState([]);
  const api = process.env.API;

  useEffect(() => {
    axios
      .get(api)
      .then((response) => setCountries(response.data))
      .catch((error) => console.log({ error }));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>React Router Dom Deneme </h1>
      </div>
      <Route
        path="/"
        exact
        render={() =>
          countries.map((country, i) => (
            <div key={i} className="country">
              <Link to={`/country/${country.alpha3Code}`}>
                <h3>{country.name}</h3>
              </Link>
            </div>
          ))
        }
      />
      <Route
        path="/country/:code"
        render={(renderProps) => {
          const country = countries.find(
            (country) => country.alpha3Code === renderProps.match.params.code
          );
          return <Country {...renderProps} country={country} />;
        }}
      />
    </Router>
  );
}

const Country = (props) => {
  const { country } = props;
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital || "Başkent yok."}</p>
      <img src={country.flag} alt={country.name} style={{ width: 250 }} />
    </div>
  );
};
