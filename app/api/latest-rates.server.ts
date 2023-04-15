import type { ActionArgs } from "@remix-run/node";
import type { CurrencyCodes } from "~/models/currency-codes";
import 'dotenv';

export interface LatestRatesData {
  "meta": {
    "last_updated_at": "2022-01-01T23:59:59Z"
  },
  "data": {
    [K in CurrencyCodes]: number;
  }
}

/**
 * 
 * @param currencies grabs latest exchange rates
 * @returns {Promise}
 */

export async function getLatestRates({ request, context, params }: ActionArgs): Promise<LatestRatesData | undefined> {
  const formData = await request.formData();
  const currencies = formData.get("currencies");
  try {
    const response = await fetch(`${process.env.API_URL}latest?${process.env.API_KEY}&currencies=${currencies}`);
    switch (response.status) {
      case 404:
        console.error(`${response.status}, Failed to fetch latest exchange rates for ${currencies}.`);
        throw new Response("Not Found", { status: 404 });
      case 200:
        const result = await response.json() as LatestRatesData;
        console.log(result)
        return result;
    }
  } catch (error) {
    console.error("Failed to make API call for latest exchange rates.");
  }
};