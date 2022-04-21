


const categoryController = require('../controllers/category.controller');


const {requestValidator, authValidator} = require('../middlewares/index');


module.exports = (app) => {
 
    app.post('/ecomm/api/v1/categories',[requestValidator.validateCatgeoryRequest, authValidator.validateToken, authValidator.isAdmin] ,categoryController.create);

    app.put('/ecomm/api/v1/categories/:id',[requestValidator.validateCatgeoryRequest, authValidator.validateToken, authValidator.isAdmin] ,categoryController.update);

    
    app.delete('/ecomm/api/v1/categories/:id',[authValidator.validateToken, authValidator.isAdmin] ,categoryController.delete);

   
    app.get('/ecomm/api/v1/categories/:id', categoryController.findOne);

   
    app.get('/ecomm/api/v1/categories', categoryController.findAll);
};