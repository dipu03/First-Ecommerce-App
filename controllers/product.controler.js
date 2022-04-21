
const db = require('../models/index');
const Product = db.product;




exports.create = (req, res) => {
    const productData = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        categoryId : req.body.categoryId
    };
    Product.create(productData).then(response => {
        console.log("new product created");
        res.status(201).send(response)
    }).catch(err => {
        console.log("error in creating new product");
        res.status(500).send({message : "some internal error occurred while creating new product"})
    });
};


exports.update =(req, res) => {
    const productData = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        categoryId : req.body.categoryId
    };
    const productId = req.params.id;
    Product.update(productData, {
        where : {id : productId}
    }).then(response => {
        console.log("update product successfully");
        res.status(201).send({
            message : "update a product successfullt",
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            categoryId : req.body.categoryId
        });
    }).catch(err => {
        console.log("error in updating a product");
        res.status(500).send({message : "some internal error occurred while updating a product"})
    });
};


exports.delete = (req, res) => {
    const productId = req.params.id;
    Product.destroy({
        where : {id : productId}
    }).then(response => {
        console.log(" product deleted successfully");
        res.sendStatus(200).send(response)
    }).catch(err => {
        console.log("error in deleting a product");
        res.sendStatus(500).send({message : "some internal error occurred while deleting neaw product"});
    });
};


exports.findOne = (req, res) => {
    const productId = req.params.id;
    Product.findByPk(productId).then(response => {
        console.log("find one product successfully");
        res.status(200).send(response)
    }).catch(err => {
        console.log("error in finding one  product");
        res.status(500).send({message : "some internal error occurred while finding one product"})
    });
};


exports.findAll = (req, res) => {
    const productName = req.query.name;
    let promise;
    if(productName){
        promise = Product.findAll({
            where : {name : productName}
        })
    }else{
        promise = Product.findAll();
    }
    promise.then(response => {
        console.log("find all product successfully");
        res.status(200).send(response)
    }).catch(err => {
        console.log("error in finding all product");
        res.status(500).send({message : "some internal error occurred while finding all product"})
    });
};


exports.findAllProductByCategoryId = (req, res) => {
    const categoryID = req.params.categoryId;
    Product.findAll({
        where : {categoryId :categoryID}
    }).then(response => {
        console.log("find all product by category id successfull");
        res.status(200).send(response)
    }).catch(err => {
        console.log("error in finding all product by category id");
        res.status(500).send({message : "some internal error occurred while finding all product by category id"})
    });
};
