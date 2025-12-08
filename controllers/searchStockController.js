import axios from "axios";

export const searchStockController = async (req, res) => {
  try {
    const { symbol } = req.params;

    const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=${process.env.FINNHUB_KEY}`;
    const { data } = await axios.get(url);

    if (!data || !data.result || data.result.length === 0) {
      return res.status(404).json({ message: "No stock found" });
    }
    

    return res.status(200).json({
      message: "Search results",
      results: data.result.map((stock) => ({
        symbol: stock.symbol,
        description: stock.description,
        type: stock.type,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Search error",
      error: error.message,
    });
  }
};
