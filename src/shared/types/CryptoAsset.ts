export interface ICryuptoCurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: any;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: any;
  self_reported_circulating_supply: any;
  self_reported_market_cap: any;
  quote: IQuote;
}

interface ICurrency {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

interface IQuote {
  [currency: string]: ICurrency;
}

export interface Status {
  timestamp: string;
  error_code: number;
  error_message: any;
  elapsed: number;
  credit_count: number;
  notice: any;
  total_count: number;
}

export interface IResult {
  status: Status;
  data: ICryuptoCurrency[];
}
