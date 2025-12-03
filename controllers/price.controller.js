import axios from "axios";

export const priceController = async (req, res) => {
  try {
    const { symbol } = req.params;

    const url = `https://finnhub.io/api/v1/quote?symbol=NSE:${symbol}&token=${process.env.FINNHUB_KEY}`;

    const { data } = await axios.get(url);

    return res.status(200).json({
      message: "Price fetched",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};
