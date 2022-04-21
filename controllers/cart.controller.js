

const db = require('../models');
const Cart = db.cart;
const Product = db.product;



exports.create = (req, res) => {
    const cartData = {
        userId : req.userId
    };
    Cart.create(cartData).then(cart => {
        res.status(201).send(cart)
    }).catch(err => {
        res.status(500).send({message : "some internal error occured while creating new cart"})
    });
};


exports.update = (req, res) => {
    const cartId = req.params.id;
    Cart.findByPk(cartId).then(cart => {
        if(!cart){
            res.status(400).send({message : "provided cartId is not valid "});
            return;
        }
        Product.findAll({
            where : {id : req.body.productIds}
        }).then(productList => {
            cart.setProducts(productList).then(response =>{
                res.status(200).send({message : "cart updated successfully"})
            })
        })
    })
};


exports.getCart = (req, res) => {
    const cartId = req.params.id;
    Cart.findByPk(cartId).then(cart => {
        if(!cart){
            res.status(400).send({message : "provided cart id not valid"});
            return;
        }
        let selectedProducts = [];
        let totalCost = 0;
        cart.getProducts().then(products => {
            for(let i=0; i<products.length; i++){
                totalCost = totalCost + products[i].price
                selectedProducts.push({
                    id : products[i].id,
                    name : products[i].name,
                    price : products[i].price
                })
            };
            res.status(200).send({
                id : cart.id,
                selectedProducts : selectedProducts,
                cost : totalCost
            });
        })
    })
};