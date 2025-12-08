import axios from "axios";

export const stockController = async (req, res) => {
  try {
    let { symbol } = req.params;

    symbol = symbol.toUpperCase(); // safe

    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`;

    const { data } = await axios.get(url);

    // Finnhub returns 0 if symbol not supported
    if (!data || data.c === 0) {
      return res.status(200).json({ price: null });
    }

    return res.status(200).json({
      price: data.c,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Quote fetch failed",
      error: error.message,
    });
  }
};