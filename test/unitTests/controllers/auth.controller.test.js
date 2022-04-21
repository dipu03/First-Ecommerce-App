// testing for sign up
/*
*   =>1.1 >. successfull sign up with role
*   =>1.2 >. successfull sign up without role
*   =>2.0 >. failed signup due to wrong role which does't exists in our ROLES
*/

// import db as model here
const Model = require('../../../models');
const User = Model.user;
const Role = Model.role;
// import auth controller
const authController = require('../../../controllers/auth.controller');
// import interceptor
const { mockRequest, mockResponse } = require('../interceptor');
// import user data
const newUser = require('../mockData/newUser.json');
// import user2
const newUserWithoutRole = require('../mockData/newUserWithoutRole.json');
// import user data
const userData = require('../mockData/userData.json')
// import bcrypt
const bcrypt = require('bcrypt');
// import jwt
const jwt = require('jsonwebtoken');
//import secret
const authConfig = require('../../../config/auth.config');




let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();

})

describe("test for sign up method of auth controller", () => {

    it("successfull sign up when user provide the role", async () => {
        req.body = newUser;

        const resFromCreate = {
            setRoles: async () => Promise.resolve()
        };
        const spyOnCreate = jest.spyOn(User, "create").mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, "findAll").mockImplementation(() => Promise.resolve());

        await authController.signup(req, res); // neet to wait for sign up then only other function can work

        // validatoing is test is successfully  runing or not
        await expect(spyOnCreate).toHaveBeenCalled(); //mock of function create
        await expect(spyOnFindAll).toHaveBeenCalled(); // mock of find all function
        await expect(User.create).toHaveBeenCalled();  // original function create
        await expect(Role.findAll).toHaveBeenCalled();  // original function of find all
        // await expect(res.status).toHaveBeenCalled();
        // console.log(res.status);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: "user created successfully with provided roles" });

    });

    console.log("i am after first test***********************************************************************");

    it("successfull sign up when user does't provide the role", async () => {
       
        req.body = newUserWithoutRole;

        const resFromCreate = {
            setRoles: async () => Promise.resolve()
        };
        const spyOnCreate = jest.spyOn(User, "create").mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, "findAll").mockImplementation(() => Promise.resolve());

        await authController.signup(req, res); // neet to wait for sign up then only other function can work

        // validatoing is test is successfully  runing or not
        await expect(spyOnCreate).toHaveBeenCalled(); //mock of function create
        await expect(spyOnFindAll).toHaveBeenCalled(); // mock of find all function
        await expect(User.create).toHaveBeenCalled();  // original function create
        await expect(Role.findAll).toHaveBeenCalled();  // original function of find all
        // await expect(res.status).toHaveBeenCalled();
        // console.log(res.status);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: "user created with default role" });

    });

    console.log("i am after second test***********************************************************************");


    // if any err while creating user


    it("failed in creating category internsal error", async() => {

        req.body = newUserWithoutRole;


        const spyOnCreate = jest.spyOn(User, "create").mockImplementation(() => Promise.reject(Error("this is an error")));

        await authController.signup(req, res); // neet to wait for sign up then only other function can work

        // validatoing is test is successfully  runing or not
        await expect(spyOnCreate).toHaveBeenCalled(); //mock of function create
        await expect(User.create).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        // console.log(res.status);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message : "internal error while creating new user"});

    });


});
console.log("i am after third test***********************************************************************");


// test for sign in

describe("test for sign in ", () => {

    beforeEach(() => {
        req.body = userData;
    });

    const userHashedPassword = bcrypt.hashSync(userData.password, 10);

    const roles = [
        {
            id: 1,
            name: "customer"
        }
    ];

    const resFromFindOne = {
        id : 1,
        ...userData,
        password: userHashedPassword,
        getRoles: async() => Promise.resolve(roles)  // role is moking so thatvwe can use it later
    };
    let token = jwt.sign({ id: 1 }, authConfig.secret, { expiresIn: 86400 });

    const expectedResFromSignIn = {
        id: 1,
        email : "abc@gmail.com",
        username : userData.username,
        roles: ["ROLES_CUSTOMER"],   // role is using here
        accessToken: token
    };

    it("sign in method should return userinfo with access token", async () => {

        const spyOnFindOne = jest.spyOn(User, "findOne").mockImplementation(() => Promise.resolve(resFromFindOne));

        await authController.signin(req, res);

        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResFromSignIn);

    });
    console.log("i am after third 4th***********************************************************************");

    // invalid user
    it("it should return user is not found for null user", async() =>{

        const spyOnFindOne = jest.spyOn(User, "findOne").mockImplementation(() => Promise.resolve(null));
        await authController.signin(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "user not found"})

    });

    console.log("i am after third 5th***********************************************************************");
    //invalid password
    it("it should return invalid password for wrong password", async() =>{
       
        const spyOnFindOne = jest.spyOn(User, "findOne").mockImplementation(() => Promise.resolve(resFromFindOne));

        req.body.password = "wrong-password";

        await authController.signin(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();
       
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "invalid password"})
        
    });
    console.log("i am after third 6th***********************************************************************");
    //catch for sign in 
    it("it should return err msg in catch on sign in", async() =>{

        const spyOnFindOne = jest.spyOn(User, "findOne").mockImplementation(() => Promise.reject(Error("this is an error")));
        await authController.signin(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "this is an error"});

        
    });
    console.log("i am after third 7th***********************************************************************");

});






















