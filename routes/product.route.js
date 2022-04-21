

const productController = require('../controllers/product.controler');


const {requestValidator, authValidator} = require('../middlewares/index');

module.exports = (app) => {
 
    app.post('/ecomm/api/v1/products', [requestValidator.validateProductRequest, authValidator.validateToken, authValidator.isAdmin] ,productController.create);

 
    app.put('/ecomm/api/v1/products/:id',[requestValidator.validateProductRequest, authValidator.validateToken, authValidator.isAdmin],  productController.update);

  
    app.delete('/ecomm/api/v1/products/:id', [authValidator.validateToken, authValidator.isAdmin],productController.delete);

   
    app.get('/ecomm/api/v1/products/:id', productController.findOne);

   
    app.get('/ecomm/api/v1/products', productController.findAll);

    
    app.get('/ecomm/api/v1/categories/:categoryId/products', [requestValidator.validateFindallProductByCategoryRequest] ,productController.findAllProductByCategoryId);
}