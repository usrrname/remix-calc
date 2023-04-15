import 'dotenv';
import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import { currencyCodes } from '~/models/currency-codes';
import type { getLatestRates } from '~/api/latest-rates.server';

export const CurrencyExchangeRate = () => {
  const data = useActionData<typeof getLatestRates>();
  console.log(data)
  const currencyAcronyms = Object.keys(currencyCodes)
  const today = new Date().toISOString().split('T')[0];

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>('');
  const [date, setDate] = useState<string>(today);

  const [currencies, setCurrencies] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<string>('')
  const [amount, setAmount] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  const handleSelectionChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    let selectedValues = Array.from(target.selectedOptions, option => option.value);
    const commaSeparated = selectedValues.join(',')
    setCurrencies(commaSeparated)
  }

  return (
    <div>
      <Form method="get">
        <label>
          Currencies
          <select name="currencies" multiple onChange={(e: any) => handleSelectionChange(e)}>
            {currencyAcronyms.map((currency, index) =>
              <option key={index} value={currency}>{currency}</option>
            )}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button type="submit">Get Latest Rates</button>
      </Form>

      {exchangeRate && date && (
        <p>
          Exchange rate from {currencies} on {date}:
          {exchangeRate}.
        </p>
      )}
      <hr></hr>
      <Form method="get">
        <label>
          Base Currency
          <select name="base-currency" onChange={(e) => setBaseCurrency(e.target.value)} defaultValue={'CAD'}>
            {currencyAcronyms.map((currency, index) =>
              <option key={index} value={currency}>{currency}</option>
            )}
          </select>
        </label>

        <label>
          Target Currency
          <select name="target-currency" onChange={(e) => setTargetCurrency(e.target.value)} defaultValue={'USD'}>
            {currencyAcronyms.map((currency, index) =>
              <option key={index}>{currency}</option>
            )}
          </select>
        </label>
        <br />

        <label>
          Amount
          <input
            type="number"
            name="amount"
            defaultValue={1}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          From
          <input
            type="date"
            name="date-from"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </label>

        <label>
          To
          <input
            type="date"
            name="date-to"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </label>
        <br />

        <button name="historical-rates" type="submit">Get Historical Rates</button>

        <button name="reset" type="reset" value="reset">Reset</button>
      </Form>

    </div>
  );
};

export default CurrencyExchangeRate;