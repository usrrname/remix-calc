import type { V2_MetaFunction } from "@remix-run/react";
import CurrencyExchangeRate from "~/components/CurrencyConverter";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Test-Driving Remix with a Currency Converter app" }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Currency Exchange Rate Converter</h1>
      <CurrencyExchangeRate></CurrencyExchangeRate>
    </div>
  );
}
