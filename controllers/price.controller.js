import axios from "axios";

export const priceController = async (req, res) => {
  try {
    let { symbol } = req.params;

    symbol = decodeURIComponent(symbol); // decode first

    // Finnhub-compatible symbols
    symbol = symbol
      .replace(/\s+/g, "") // remove spaces
      .replace("&", "") // remove ampersand
      .toUpperCase();

    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`;

    const { data } = await axios.get(url);

    return res.status(200).json({
      price: data.c || 0,
    });
  } catch (error) {
    return res.status(500).json({
      price: 0,
    });
  }
};
