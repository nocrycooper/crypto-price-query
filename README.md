# crypto-price.js

crypto-price.js es un paquete Node.js que te permite obtener información sobre el precio de las criptomonedas en tiempo real utilizando la API de CoinGecko.

## Instalación

Puedes instalar este paquete a través de npm utilizando el siguiente comando:

```bash
npm install crypto-price.js
```

## Uso

Para comenzar a utilizar crypto-price.js, simplemente importa el paquete en tu proyecto y llama a las funciones disponibles. Aquí tienes un ejemplo de cómo obtener el precio de Bitcoin (BTC) en dólares estadounidenses (USD):

```js
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const bitcoinPrice = await cryptoPrice.getCryptoPrice('bitcoin');
    console.log('Precio de Bitcoin en USD:', bitcoinPrice);
  } catch (error) {
    console.error(error);
  }
})();
```

## Documentación

### `getCryptoPrice(coinId, property)`
La función getCryptoPrice permite obtener un valor específico de una criptomoneda a partir de su identificador (coinId) y la propiedad (property) en el objeto JSON de la respuesta.

Parámetros
- `coinId` (string): El identificador de la criptomoneda que deseas consultar. Por ejemplo, "bitcoin" para Bitcoin.
- `property` (string): La propiedad en el objeto JSON de la respuesta que deseas obtener. Por ejemplo, "market_data.current_price.mxn" para obtener el precio en pesos mexicanos.

### Ejemplo: 

```js
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const bitcoinMXNPrice = await cryptoPrice.getCryptoPrice('bitcoin', 'market_data.current_price.mxn');
    console.log('Precio de Bitcoin en MXN:', bitcoinMXNPrice);
  } catch (error) {
    console.error(error);
  }
})();

```

### `listTopCryptos(limit)`
La función listTopCryptos permite listar las principales criptomonedas por capitalización de mercado. Puedes especificar el número máximo de criptomonedas que deseas listar utilizando el parámetro limit.

Parámetros
- `limit` (number, opcional): El número máximo de criptomonedas que deseas listar. El valor predeterminado es 10.

### Ejemplo:

```js
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const topCryptos = await cryptoPrice.listTopCryptos(20); // Listar las 20 principales criptomonedas
    console.log('Principales criptomonedas:', topCryptos);
  } catch (error) {
    console.error(error);
  }
})();
```

### `calculateValue(coin, quantity, currency)`

La función `calculateValue` permite calcular el valor total de una cantidad específica de una criptomoneda en una moneda de referencia. Esta función toma tres parámetros:

- `coin` (string): El nombre de la criptomoneda que deseas calcular.
- `quantity` (number): La cantidad de la criptomoneda que deseas calcular.
- `currency` (string): La moneda de referencia en la que deseas calcular el valor. Esta moneda debe estar en minúsculas y puede incluir propiedades anidadas, separadas por puntos. Por ejemplo, "market_data.current_price.mxn" para obtener el precio en pesos mexicanos.

#### EJEMPLO

```javascript
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const coin = "bitcoin";
    const quantity = 3;
    const currency = "market_data.current_price.mxn";

    const value = await cryptoPrice.calculateValue(coin, quantity, currency);
    console.log(`El valor de ${quantity} ${coin} en MXN es: ${value.toFixed(2)}`);
  } catch (error) {
    console.error(error);
  }
})();
```

### `getTrendingCoins(values)`

La función `getTrendingCoins` permite obtener la lista de criptomonedas trending. Puede aceptar un parámetro opcional `values`, que es un arreglo de valores específicos que deseas obtener para cada criptomoneda. Si no se proporciona `values`, se obtendrá toda la información disponible para las monedas trending.

#### Ejemplo de uso:

```javascript
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    // Obtener toda la información de las monedas trending
    const trendingCoinsAll = await cryptoPrice.getTrendingCoins();
    console.log('Criptomonedas Trending (Toda la información):', trendingCoinsAll);

    // Obtener información específica de las monedas trending (name, coin_id y symbol)
    const valuesToRetrieve = ["name", "coin_id", "symbol"];
    const trendingCoinsSelected = await cryptoPrice.getTrendingCoins(valuesToRetrieve);
    console.log('Criptomonedas Trending (Valores seleccionados):', trendingCoinsSelected);
  } catch (error) {
    console.error(error);
  }
})();
```

### `getApiPing()`

La función getApiPing permite obtener el estado de la API CoinGecko. Retorna un mensaje que indica el estado de la API.

#### Ejemplo de uso:

```javascript
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const apiStatus = await cryptoPrice.getApiPing();
    console.log('Estado de la API CoinGecko:', apiStatus);
  } catch (error) {
    console.error(error);
  }
})();
```

### `getCryptoPrice(coin, currency)`

La función `getCryptoPrice` permite obtener el precio de una criptomoneda en una moneda específica. Debes proporcionar el nombre de la criptomoneda (`coin`) y la moneda de referencia (`currency`) en la que deseas obtener el precio.

Ejemplo de uso:

```javascript
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const coin = "bitcoin";
    const currency = "mxn";

    const price = await cryptoPrice.getCryptoPrice(coin, currency);
    console.log(`El precio de ${coin} en ${currency} es: ${price}`);
  } catch (error) {
    console.error(error);
  }
})();
```

### `getCoinList()`

La función `getCoinList` permite obtener la lista de todas las criptomonedas disponibles. Retorna un arreglo con la información de todas las criptomonedas.

Ejemplo de uso:

```js
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const coinList = await cryptoPrice.getCoinList();
    console.log('Lista de Criptomonedas Disponibles:', coinList);
  } catch (error) {
    console.error(error);
  }
})();
```

### `getCoinCategoriesList()`

La función `getCoinCategoriesList` permite obtener la lista de todas las categorias de criptomonedas disponibles. Retorna un arreglo con la información de todas las categorias.

Ejemplo de uso:

```js
const cryptoPrice = require('crypto-price.js');

(async () => {
  try {
    const list = await cryptoPrice.getCoinCategoriesList();
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();
```

### `calculateCryptoProfit`

La función calcula la ganancia o pérdida restando el costo total de la compra del costo total de la venta. El resultado incluye la criptomoneda, los precios de compra y venta, la cantidad y el valor de la ganancia o pérdida.

- `coin`: El nombre de la criptomoneda en la que has invertido.
- `buyPrice`: El precio al que compraste la criptomoneda.
- `sellPrice`: El precio al que vendiste la criptomoneda.
- `quantity`: La cantidad de la criptomoneda que has comprado.

Ejemplo de uso:

```js
const cryptoPrice = require('crypto-price.js');

const coin = "bitcoin";
const buyPrice = 45000; // Precio de compra
const sellPrice = 48000; // Precio de venta
const quantity = 2; // Cantidad de Bitcoin comprada

const profitOrLoss = cryptoPrice.calculateCryptoProfit(coin, buyPrice, sellPrice, quantity);
console.log('Resultado de la inversión:', profitOrLoss);
```

### `getCryptoLogo(coin)`

La función realiza una solicitud a la API de CoinGecko para obtener información sobre la criptomoneda, incluyendo la URL del logotipo. Luego, devuelve un objeto que contiene el nombre de la criptomoneda y la URL del logotipo.

- `coin`: El nombre o identificador de la criptomoneda de la que deseas obtener el logotipo.

Ejemplo:
```javascript
const cryptoPrice = require('crypto-price.js');

const coin = "bitcoin";

cryptoPrice.getCryptoLogo(coin)
  .then((result) => {
    console.log(`Logotipo de ${result.coin}: ${result.logoUrl}`);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

### `getCryptoAllTimeHigh(coin, currency)`
Obten el valor mas alto que ha obtenido la moneda en toda su historia.

- `coin`: El nombre o identificador de la criptomoneda de la que deseas obtener el precio máximo o mínimo histórico.
- `currency`: La moneda en la que deseas obtener el precio máximo o mínimo histórico (por ejemplo, "usd", "eur", "mxn", etc.).

### `getCryptoAllTimeLow(coin, currency)`
Obten el valor mas bajo que ha obtenido la moneda en toda su historia.

La función realiza una solicitud a la API de CoinGecko para obtener información sobre la criptomoneda, incluyendo la URL del logotipo. Luego, devuelve un objeto que contiene el nombre de la criptomoneda y la URL del logotipo.

- `coin`: El nombre o identificador de la criptomoneda de la que deseas obtener el precio máximo o mínimo histórico.
- `currency`: La moneda en la que deseas obtener el precio máximo o mínimo histórico (por ejemplo, "usd", "eur", "mxn", etc.).

Ejemplo de allTimeLow y allTimeHigh:
```javascript
const cryptoPrice = require('crypto-price.js');

const coin = "bitcoin";
const currency = "usd";

cryptoPrice.getCryptoAllTimeHigh(coin, currency)
  .then((result) => {
    console.log(`Precio máximo histórico de ${result.coin} en ${result.currency}: ${result.allTimeHigh}`);
  })
  .catch((error) => {
    console.error(error.message);
  });

cryptoPrice.getCryptoAllTimeLow(coin, currency)
  .then((result) => {
    console.log(`Precio mínimo histórico de ${result.coin} en ${result.currency}: ${result.allTimeLow}`);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

# SUGERENCIAS Y SOPORTE

En el **[Servidor de Discord](https://discord.gg/y7kdFEGpfm)**

# Changelog

### 12 de Septiembre (0.6.0)
- Se añadieron dos funciones
 - `getCryptoAllTimeHigh`
 - `getCryptoAllTimeLow`

### 8 de Septiembre (0.5.0)

#### 0.5.0
- Se añadio una funcion
 - `getCryptoLogo`

### 7 de Septiembre (0.4.0 - 0.4.5)

#### 0.4.5
- Se añadio una nueva funcion
 - `calculateCryptoProfit`

#### 0.4.0
- Se añadieron nuevas funciones.
 - `getCryptoPrice`
 - `getCoinList`
 - `getCoinCategoriesList`


### 6 de Septiembre (0.2.0 - 0.3.0)

#### 0.3.0
- Se añadieron dos funciones
 - `getTrendingCoins`
 - `getApiPing`

#### 0.2.1 - 0.2.3
- Correción de Bugs
- Se añadieron keywords para la busqueda del **NPM**.

#### 0.2.0
- Se añadio la función `calculateValue`.
- La documentación fue actualizada con los cambios correspondientes.

### 5 de Septiembre (0.1.1 - 0.1.2)

#### 0.1.1
- Se añadio documentación (**README.md**)

#### 0.1.2
- Se corrigio algunas cosas.

### 4 de Septiembre (0.1.0)

- El npm fue creado y publicado.

# IDEAS PARA UN FUTURO

- Crear un servidor de discord.