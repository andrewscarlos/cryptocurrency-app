import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${req.query.id}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro ao chamar a API CoinMarketCap:", error);
    res.status(500).json({ error: "Erro ao processar a requisição" });
  }
}
