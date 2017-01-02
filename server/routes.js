const router = require('express').Router();
const ordersHandler = require('./requestHandlers/ordersHandler');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kofile API' });
});

router.post('/prices', ordersHandler.ordersPricesHandler);

router.post('/distribution', ordersHandler.ordersDistributionHandler);

module.exports = router;