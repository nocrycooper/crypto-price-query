// index.js

const axios = require('axios');

// Función para obtener información específica de una criptomoneda
async function getCryptoInfo(coinId, property) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = response.data;

    // Separar las propiedades anidadas por puntos y navegar a través de ellas
    const properties = property.split('.');
    let value = data;

    for (const prop of properties) {
      if (!value[prop]) {
        throw new Error(`La propiedad "${prop}" no existe para la criptomoneda ${coinId}`);
      }
      value = value[prop];
    }

    return value;
  } catch (error) {
    throw new Error(`Error al obtener la propiedad "${property}" de ${coinId}: ${error.message}`);
  }
}

// Función para listar las principales criptomonedas
async function listTopCryptos(limit = 10) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false,
      },
    });

    const cryptoList = response.data.map((crypto) => ({
      name: crypto.name,
      symbol: crypto.symbol,
      marketCap: crypto.market_cap,
      currentPrice: crypto.current_price,
      // Agregar más propiedades según sea necesario
    }));

    return cryptoList;
  } catch (error) {
    throw new Error(`Error al listar las principales criptomonedas: ${error.message}`);
  }
}

// Función para calcular el valor de una cantidad de criptomoneda en una moneda de referencia
async function calculateValue(coin, quantity, currency) {
  try {
    // Obtener los datos de la criptomoneda
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
    const data = response.data;

    // Convertir currency a minúsculas y separar las propiedades anidadas por puntos
    const currencyLowerCase = currency.toLowerCase();
    const properties = currencyLowerCase.split('.');
    let value = data;

    for (const prop of properties) {
      if (!value[prop]) {
        throw new Error(`La propiedad "${prop}" no existe para la criptomoneda ${coin}`);
      }
      value = value[prop];
    }

    // Calcular el valor total
    const totalValue = quantity * value;

    return totalValue;
  } catch (error) {
    throw new Error(`Error al calcular el valor: ${error.message}`);
  }
}

// Función para obtener las criptomonedas trending
async function getTrendingCoins(values = []) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    const trendingCoins = response.data.coins.map((coin) => {
      if (values.length === 0) {
        return coin.item;
      } else {
        const filteredCoin = {};
        for (const value of values) {
          if (coin.item[value]) {
            filteredCoin[value] = coin.item[value];
          }
        }
        return filteredCoin;
      }
    });

    return trendingCoins;
  } catch (error) {
    throw new Error(`Error al obtener las criptomonedas trending: ${error.message}`);
  }
}

// Función para obtener el estado de la API
async function getApiPing() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/ping');
    const apiStatus = response.data.gecko_says;

    return apiStatus;
  } catch (error) {
    throw new Error(`Error al obtener el estado de la API: ${error.message}`);
  }
}

// Función para obtener el precio de una criptomoneda en una moneda específica
async function getCryptoPrice(coin, currency) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`);
    const priceData = response.data;

    if (priceData[coin] && priceData[coin][currency]) {
      return priceData[coin][currency];
    } else {
      throw new Error(`No se encontró información para la criptomoneda ${coin} en la moneda ${currency}`);
    }
  } catch (error) {
    throw new Error(`Error al obtener el precio: ${error.message}`);
  }
}

// Función para obtener la lista de todas las criptomonedas disponibles
async function getCoinList() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    const coinList = response.data;

    return coinList;
  } catch (error) {
    throw new Error(`Error al obtener la lista de criptomonedas: ${error.message}`);
  }
}

// Función para obtener la lista de todas las categorias de las criptomonedas disponibles
async function getCoinCategoriesList() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/categories/list');
    const coinList = response.data;

    return coinList;
  } catch (error) {
    throw new Error(`Error al obtener la lista de las categorias de las criptomonedas: ${error.message}`);
  }
}

// Función para calcular la ganancia o pérdida de una inversión en una criptomoneda
function calculateCryptoProfit(coin, buyPrice, sellPrice, quantity) {
  try {
    const buyTotal = buyPrice * quantity;
    const sellTotal = sellPrice * quantity;
    const profitOrLoss = sellTotal - buyTotal;

    return {
      coin,
      buyPrice,
      sellPrice,
      quantity,
      profitOrLoss,
    };
  } catch (error) {
    throw new Error(`Error al calcular la ganancia o pérdida: ${error.message}`);
  }
}

// Función para obtener el logotipo o icono de una criptomoneda
async function getCryptoLogo(coin) {
  try {
    // Obtener datos de la criptomoneda
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
    const data = response.data;

    // Obtener el logotipo o icono de la criptomoneda
    const logoUrl = data.image.large;

    return {
      coin,
      logoUrl,
    };
  } catch (error) {
    throw new Error(`Error al obtener el logotipo de la criptomoneda: ${error.message}`);
  }
}

// Función para obtener el precio máximo histórico de una criptomoneda en una moneda específica
async function getCryptoAllTimeHigh(coin, currency) {
  try {
    // Realizar una solicitud a la API de CoinGecko para obtener el precio máximo histórico
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=${currency}&from=0&to=9999999999`);
    const data = response.data;

    // Encontrar el precio máximo en los datos
    const prices = data.prices;
    const allTimeHigh = Math.max(...prices.map((price) => price[1]));

    return {
      coin,
      currency,
      allTimeHigh,
    };
  } catch (error) {
    throw new Error(`Error al obtener el precio máximo histórico: ${error.message}`);
  }
}

// Función para obtener el precio mínimo histórico de una criptomoneda en una moneda específica
async function getCryptoAllTimeLow(coin, currency) {
  try {
    // Realizar una solicitud a la API de CoinGecko para obtener el precio mínimo histórico
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=${currency}&from=0&to=9999999999`);
    const data = response.data;

    // Encontrar el precio mínimo en los datos
    const prices = data.prices;
    const allTimeLow = Math.min(...prices.map((price) => price[1]));

    return {
      coin,
      currency,
      allTimeLow,
    };
  } catch (error) {
    throw new Error(`Error al obtener el precio mínimo histórico: ${error.message}`);
  }
}

// Exportar las funciones para que estén disponibles para otros módulos
module.exports = {
  getCryptoInfo,
  listTopCryptos,
  calculateValue,
  getTrendingCoins,
  getApiPing,
  getCryptoPrice,
  getCoinList,
  getCoinCategoriesList,
  calculateCryptoProfit,
  getCryptoLogo,
  getCryptoAllTimeHigh,
  getCryptoAllTimeLow,
};
