
const db  = require('../models/index')


const checkDuplicateUsernameOrEmail = (req, res, next) => {
    db.user.findOne({
        where : {username : req.body.username}
    }).then(user => {
        if(user){
            res.status(400).send({message : "username is already exists"})
            return
        }
        db.user.findOne({
            where : {email : req.body.email}
        }).then(user => {
            if(user){
                res.status(400).send({message : "email is already exists"})
                return;
            }
            next();
        }) 
    }) 
};

// validate the given role present or not
const checkRoleExists = (req, res, next) => {
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length; i++){
            if(!db.ROLES.includes(req.body.roles[i])){
                return res.status(403).send({message : "provided role is not exists: "+ req.body.roles[i]})
            }
        }
    }
    next();
}

module.exports = {checkDuplicateUsernameOrEmail, checkRoleExists}