

const cartController = require('../controllers/cart.controller');


const {authValidator} = require('../middlewares/index');




module.exports = (app) => {

    app.post('/ecomm/api/v1/carts', [authValidator.validateToken], cartController.create);


    app.put('/ecomm/api/v1/carts/:id', [authValidator.validateToken], cartController.update);


    app.get('/ecomm/api/v1/carts/:id', [authValidator.validateToken], cartController.getCart);
};