const cryptoPrice = require('./index'); // Importa tu paquete correctamente

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

