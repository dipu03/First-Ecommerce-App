

const db = require('../models');

const validateCatgeoryRequest = (req, res, next) => {
    if(!req.body.name){
        res.status(400).send({message : "category name can't be empty"})
        return;
    }
    next()
};

const validateProductRequest = (req, res, next) => {
    if(!req.body.name || !req.body.price || !req.body.categoryId){
        res.status(400).send({message : "name, price, categoryId can't be empty"});
        return;
    }
    if(req.body.categoryId){
        db.category.findByPk(req.body.categoryId).then(response => {
            if(!response){
                res.status(400).send({message : `caregory is is not valid : ${req.body.categoryId}`})
                return;
            }else{
                if(req.body.price<=0){
                    res.status(400).send({message : "price doesn't seems to be in place"})
                    return;
                }else{
                    next();
                }
            }
        })
    }
};


const validateFindallProductByCategoryRequest = (req, res, next) => {
    const categoryID = req.params.categoryId;
    if(categoryID){
        db.category.findByPk(categoryID).then(response => {
            if(!response){
                res.status(400).send({message : "category id is not valid : " + categoryID})
                return;
            }else{
                next()
            }
        })
    }else{
        res.status(400).send({message : "category id is not available"});
        return;
    }
} 

module.exports = {validateCatgeoryRequest, validateProductRequest, validateFindallProductByCategoryRequest}