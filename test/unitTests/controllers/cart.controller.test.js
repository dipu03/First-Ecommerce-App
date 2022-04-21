// here we will write cart conotroller test

const cartController = require('../../../controllers/cart.controller');


const Model = require('../../../models');

const { mockRequest, mockResponse } = require('../interceptor')
const Cart = Model.cart;


const newCartData = require('../mockData/newCartData.json');



let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
});

// create a cart
describe("test cart controller", () => {
    beforeEach(() => {
        req.body = {};
        userId = 1;
    })

    // create a cart in successfull condition
    it("call cart.create and throw error", async() => {
        const resFromCreate = {
            ...newCartData
        };
        const spyOnCreate = jest.spyOn(Cart, "create").mockImplementation(() => Promise.resolve(resFromCreate));
        await cartController.create(req, res);
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(Cart.create).toHaveBeenCalled();
        await expect(Cart.create).toHaveBeenCalledWith({});
    
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(resFromCreate);

    });

    /// error creating cart
    it("call cart.create and throw error", async() => {
       

        const spyOnCreate = jest.spyOn(Cart, "create").mockImplementation(() => Promise.reject(Error("this is new error")));
        await cartController.create(req, res);
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(Cart.create).toHaveBeenCalled();
    
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal error occured while creating new cart"});
    });
});
