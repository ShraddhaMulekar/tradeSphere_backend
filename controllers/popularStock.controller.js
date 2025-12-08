import axios from "axios";

// Curated list of popular stocks
const POPULAR_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "V", name: "Visa Inc." },
  { symbol: "WMT", name: "Walmart Inc." },
  { symbol: "DIS", name: "The Walt Disney Company" },
  { symbol: "NFLX", name: "Netflix Inc." },
  { symbol: "BA", name: "Boeing Company" },
  { symbol: "INTC", name: "Intel Corporation" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "PYPL", name: "PayPal Holdings Inc." },
  { symbol: "CSCO", name: "Cisco Systems Inc." },
  { symbol: "PEP", name: "PepsiCo Inc." },
  { symbol: "KO", name: "The Coca-Cola Company" },
  { symbol: "NKE", name: "NIKE Inc." },
];

export const getPopularStocksController = async (req, res) => {
  try {
    // Fetch prices for all popular stocks
    const stocksWithPrices = await Promise.all(
      POPULAR_STOCKS.map(async (stock) => {
        try {
          const { data } = await axios.get(
            "https://finnhub.io/api/v1/quote",
            {
              params: {
                symbol: stock.symbol,
                token: process.env.FINNHUB_KEY,
              },
            }
          );

          return {
            symbol: stock.symbol,
            name: stock.name,
            price: data.c || 0,
            change: data.d || 0,
            changePercent: data.dp || 0,
          };
        } catch (err) {
          // If price fetch fails, return stock with 0 price
          return {
            symbol: stock.symbol,
            name: stock.name,
            price: 0,
            change: 0,
            changePercent: 0,
          };
        }
      })
    );

    // Filter out stocks with invalid prices
    const validStocks = stocksWithPrices.filter((stock) => stock.price > 0);

    return res.status(200).json({
      message: "Popular stocks fetched",
      stocks: validStocks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching popular stocks",
      error: error.message,
    });
  }
};