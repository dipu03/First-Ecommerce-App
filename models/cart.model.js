


module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        cost : {
            type : Sequelize.INTEGER
        }
    })
    return Cart;
}