


const authController = require('../controllers/auth.controller');


const {verifySignUp} = require('../middlewares/index');


module.exports = (app) => {
    // sign up
    app.post('/ecomm/api/v1/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExists] ,authController.signup);

    // sigh in
    app.post('/ecomm/api/v1/auth/signin', authController.signin);

}