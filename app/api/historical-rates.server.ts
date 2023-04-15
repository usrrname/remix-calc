import 'dotenv';

export async function getHistoricalRates(
  currencies: FormDataEntryValue,
  baseCurrency: FormDataEntryValue,
  dateFrom: FormDataEntryValue,
  dateTo: FormDataEntryValue) {
  try {
    const response = await fetch(
      `${process.env.API_URL}historical?apikey=${process.env.API_KEY}?currencies=${currencies}&base_currency=${baseCurrency}&date_from=${dateFrom}&date_to${dateTo}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return data;
    } else {
      console.error("Failed to fetch exchange rates. Please check your inputs.");
    }
  } catch (error) {
    console.error("Failed to make API call for historical exchange rates. Please check your inputs.");
  }
}