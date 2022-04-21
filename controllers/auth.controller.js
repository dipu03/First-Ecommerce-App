

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../models/index');
const authConfig = require('../config/auth.config');


const Role = db.role;
const User = db.user;
const Op = db.Sequelize.Op;


exports.signup = (req, res) => {
    const userData = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10)
    };
    User.create(userData).then(user => {
        if(req.body.roles){
            Role.findAll({
                where : {name : {[Op.or] : req.body.roles}}
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(201).send({message : "user created successfully with provided roles"})
                });
            })
        }else{
            Role.findAll({
                where : {name : "customer"}
            }).then (role=> {
                user.setRoles(role).then(() => {
                    res.status(201).send({message : "user created with default role"})
                })
            })
        }
    }).catch(err => {
        res.status(500).send({message : "internal error while creating new user"})
    })
};



exports.signin = (req,res) => {
    User.findOne ({
        where : {username : req.body.username}
    }).then(user => {
        if(!user){
            return res.status(404).send({message : "user not found"})
        }
        let isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).send({message : "invalid password"})
        }
        let token = jwt.sign({id : user.id}, authConfig.secret, {expiresIn : 86400});
        user.getRoles().then(roles => {
            let authorities = [];
            for(let i=0; i<roles.length; i++){
                authorities.push("ROLES_"+roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id : user.id,
                username : user.username,
                email : user.email,
                roles : authorities,
                accessToken : token
            })
        })
    }).catch(err => {
        res.status(500).send({message : err.message})
    });
};
