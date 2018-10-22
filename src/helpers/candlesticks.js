import moment from 'moment';


export function createEmptyCandle (data) {
  return ({
    date: moment(data.date),
    // BV: coin.BV,
    quote: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    },
    usdNorm: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    },
  });
}

export function createCandleFromCoinApi (data) {
  return {
    // BV: coin.BV,
    date: moment(data.time_period_start),
    quote: {
      open: data.price_open,
      high: data.price_high,
      low: data.price_low,
      close: data.price_close,
      volume: data.volume_traded,
    },
    usdNorm: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    },
  };
}
export function createCandleFromCoinigy (data) {
  return {
    // BV: coin.BV,
    date: moment(data.timeStart),
    quote: {
      open: data.price_open,
      high: data.price_high,
      low: data.price_low,
      close: data.price_close,
      volume: data.volume_traded,
    },
    usdNorm: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    },
  };
}
export function createCandleFromDb (data) {
  return {
    // BV: coin.BV,
    date: moment(data.date),
    quote: {
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume,
    },
    usdNorm: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
    },
  };
}


function createNormalizedCandle (btc, coin) {
  return ({
    // BV: coin.BV,
    date: coin.date,
    quote: coin.quote,
    usdNorm: {
      open: btc.quote.open * coin.quote.open,
      high: btc.quote.high * coin.quote.high,
      low: btc.quote.low * coin.quote.low,
      close: btc.quote.close * coin.quote.close,
      volume: btc.quote.volume * coin.quote.volume,
    },
  });
}

export function normalizeMarketData (btcData, coinData) {
  const data = [];

  if (!btcData || btcData.length === 0) return [];
  if (!coinData || coinData.length === 0) return [];

  for (let i = 0; i < coinData.length; i++) {
    const coin = coinData[i];
    let isMissing = true;
    for (let j = 0; j < btcData.length; j++) {
      const btc = btcData[j];
      if (coin.date.isSame(btc.date, 'minute')) {
        isMissing = false;

        data.push(createNormalizedCandle(btc, coin));
        break;
      }
    }
    if (isMissing) data.push(createEmptyCandle(coin));
  }


  return data;
}

