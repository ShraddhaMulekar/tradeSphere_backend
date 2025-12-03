import axios from "axios";

export const searchStockController = async (req, res) => {
  try {
    const { symbol } = req.params;

    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.FINNHUB_KEY}`;    //FINNHUB_KEY -> https://finnhub.io/dashboard

    const { data } = await axios.get(url);

    if (!data.bestMatches || data.bestMatches.length === 0) {
      return res.status(404).json({
        message: "No matching stocks found",
        apiResponse: data,
      });
    }

    return res.status(200).json({
      message: "Stock fetched successfully",
      Data: data.bestMatches,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching stock",
      error: error.message,
    });
  }
};
