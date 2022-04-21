
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const authConfig = require('../config/auth.config');



const validateToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "no token provided" });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized" })
        }
        req.userId = decoded.id;
        next();
    })
};


const isAdmin = (req, res, next) => {
   db.user.findByPk(req.userId).then(user => {
       if(!user){
           return res.status(404).send({message : "user not found"})
       }
       user.getRoles().then(roles => {
           for(let i=0; i<roles.length; i++){
               if(roles[i].name == "admin"){
                   next();
                   return;
               }
           }
           res.status(403).send({message : "admin role required"});
           return;
       })
   })

};


module.exports = { validateToken, isAdmin };