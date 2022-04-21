const express = require('express');
const app = express();



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./models/index');
const serverConfig = require('./config/server.config');

const port = process.env.PORT || serverConfig.PORT;



function init() {
    db.role.create({
        id : 1,
        name : db.ROLES[0]
    });
    db.role.create({
        id : 2,
        name : db.ROLES[1]
    });
    var categoryData = [
        { name: "electronics", description: "this is electronics section" },
        { name: "vegetable", description: "this is vegetable section" }
    ];
    var  productData = [
        {name :"samsung", description : "i am samsung ", price : 10000, categoryId : 1},
        {name :"redmi", description : "i am redmi ", price : 19000,categoryId : 1},
        {name :"potato", description : "i am potato ", price : 19000,categoryId : 2}
    ];


    db.category.bulkCreate(categoryData).then(responce => {
        console.log("category data initialize with category table/modell")
    }).catch(err => {
        console.log("error in initializing caregory data : "+ err)
    })
    db.product.bulkCreate(productData).then(responce => {
        console.log("product data initialize with product table/modell")
    }).catch(err => {
        console.log("error in initializing product data : "+ err)
    })
};


db.sequelize.sync({force:true}).then(response => {
    console.log("category table drop and re created");
    init();
});




require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/auth.route')(app);
require('./routes/cart.route')(app);
require('./routes/base.route')(app);

app.listen(port, function () {
    console.log("our app is runing at port : " + port)
});