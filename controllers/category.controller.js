

const db = require('../models/index');
const Category = db.category;



exports.create = (req, res) => {
    const categoryData = {
        name : req.body.name,
        description : req.body.description
    }
    Category.create(categoryData).then(response => {
        console.log("category created successfully");
        res.status(201).send(response)
    }).catch(err => {
        console.log("erroe in creating cataegory");
        res.status(500).send({
            message : "some inter error occured while creating new category"
        })
    })
};


exports.update = (req, res) => {
    const categoryData = {
        name : req.body.name,
        description : req.body.description
    };
    const categoryId = req.params.id;
    Category.update(categoryData,{
        where : {id : categoryId}
    }).then(response => {
        console.log("category updated successfully");
        res.status(200).send(
            {message : "category update successfully",
            name : req.body.name,
            description : req.body.description });
    }).catch(err => {
        console.log("erroe in updating new category");
        res.status(500).send(
            {message : "some internal errro occured while updating category"})
    })
};

exports.delete = (req, res) => {
    const categoryId = req.params.id;
    Category.destroy({
        where : {id : categoryId}
    }).then(response => {
        console.log("category deleted successfully");
        res.sendStatus(200).send(response)
    }).catch(err => {
        console.log("erroe in deleting a category");
        res.sendStatus(500).send(
            {message : "some internal errro occured while deleting a category"})
    })
};



exports.findOne = (req, res) => {
    const categoryId = req.params.id;
    Category.findByPk(categoryId).then(response => {
        console.log("find one category successfull");
        res.status(200).send(response)
    }).catch(err => {
        console.log("erroe in find one category");
        res.status(500).send(
            {message : "some internal errro occured while finding one category"})
    })
};


exports.findAll =(req, res) => {
    const categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where : {name : categoryName}
        })
    }else{
        promise = Category.findAll();
    }
    promise.then(response => {
        console.log("find all category  successfully");
        res.status(200).send(response)
    }).catch(err => {
        console.log("erroe in finding all category");
        res.status(500).send(
            {message : "some internal errro occured while finding all category"})
    })
};
