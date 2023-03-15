const PORT = 8000;
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/convert", (req, res) => {
  const toCurrency = req.query.to_currency;
  const fromCurrency = req.query.from_currency;

  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      from_currency: fromCurrency,
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: toCurrency,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(
        response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
      );
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/news", (req, res) => {
  const options = {
    method: "GET",
    url: "https://crypto-update-live.p.rapidapi.com/news",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "crypto-update-live.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
