// here we will write product controller tests

//import product
const productController = require('../../../controllers/product.controler')

const Model = require('../../../models');
const { mockRequest, mockResponse } = require('../interceptor');
const Product = Model.product;

const newProductData = require('../mockData/newProductData.json');

let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse()
});

describe("test for product.create", () => {
    beforeEach(() => {
        req.body = newProductData
    });

    it("call product.create successfully new product created", async () => {
        const expectResFromCreate = {
            ...newProductData,
            id: 1
        }
        const spyOnCreate = jest.spyOn(Product, "create").mockImplementation((newProductData) => Promise.resolve(expectResFromCreate));

        await productController.create(req, res);
        await expect(spyOnCreate).toHaveBeenCalled();

        expect(Product.create).toHaveBeenCalled();
        expect(Product.create).toHaveBeenCalledWith(newProductData);


        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectResFromCreate);

    });
    // call product.create and got error
    it("would call product.create and throw error", async () => {

        const spyOnCreate = jest.spyOn(Product, "create").mockImplementation(() => Promise.reject(Error("this is new error")));

        await productController.create(req, res);
        await expect(spyOnCreate).toHaveBeenCalled();

        expect(Product.create).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: "some internal error occurred while creating new product" });
    });

});

// update a product
describe("test for product.create", () => {

    beforeEach(() => {
        req.body = newProductData,
            req.params = {
                id: 1
            }
    });

    const expectedResFromUpdate = {
        ...newProductData,
        message: "update a product successfullt",
    }

    it("call product.update successfully new product updated", async () => {

        const spyOnUpdate = jest.spyOn(Product, "update").mockImplementation((newCategoryData) => Promise.resolve(expectedResFromUpdate))
        await productController.update(req, res);
        await expect(spyOnUpdate).toHaveBeenCalled();

        expect(Product.update).toHaveBeenCalled();
        expect(Product.create).toHaveBeenCalledWith(newProductData);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResFromUpdate);
    })

    // error in update
    it("call product.update and send an error", async () => {

        const spyOnUpdate = jest.spyOn(Product, "update").mockImplementation(() => Promise.reject(Error("this is new error")))
        await productController.update(req, res);
        await expect(spyOnUpdate).toHaveBeenCalled();

        expect(Product.update).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: "some internal error occurred while updating a product" });

    });
});

// delete a category
describe("test for product.create", () => {
    beforeEach(() => {
        req.params = {
            id: 1
        }
    });

    it("call product.delete successfully delete a  product", async () => {

        const spyOnDestroy = jest.spyOn(Product, "destroy").mockImplementation(() => Promise.resolve("deleted successfull"))
        await productController.delete(req, res);
        await expect(spyOnDestroy).toHaveBeenCalled();

        expect(Product.destroy).toHaveBeenCalled();

        expect(res.sendStatus).toHaveBeenCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith("deleted successfull");
    });
    // error in delete
    it("call product.delete successfully delete a  product", async () => {
        const spyOnDestroy = jest.spyOn(Product, "destroy").mockImplementation(() => Promise.reject(Error("this is a new error")));
        await productController.delete(req, res);
        await expect(spyOnDestroy).toHaveBeenCalled();

        expect(Product.destroy).toHaveBeenCalled();

        expect(res.sendStatus).toHaveBeenCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: "some internal error occurred while deleting neaw product" });

    });


})


//find one product by id
describe("test for product.create", () => {
    beforeEach(() => {
        req.params = {
            id : 1
        }
    });

    it("call product.findOne successfully find a  product", async () => {

        const expectedResFromFindOne = {
            ...newProductData,
            id : req.params.id
        }
        const spyOnFindByPk = jest.spyOn(Product, "findByPk").mockImplementation(() => Promise.resolve(expectedResFromFindOne));

        await productController.findOne(req, res);
        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Product.findByPk).toHaveBeenCalled();
        await expect(Product.findByPk).toHaveBeenCalledWith(req.params.id);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResFromFindOne);

    });

    // error find one a product by id
    it("call product.findOne  and got erro product", async () => {
        const spyOnFindByPk = jest.spyOn(Product, "findByPk").mockImplementation(() => Promise.reject(Error("this is new error")));

        await productController.findOne(req, res);
        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Product.findByPk).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal error occurred while finding one product"});

    });

});


// find all product
describe("test for product.create", () => {

    it("call product.find all product without query", async () => {
        const spyOnFindAll = jest.spyOn(Product, "findAll").mockImplementation(() => Promise.resolve(newProductData));
        await productController.findAll(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProductData);

    });


    it("call product.find all product with query", async () => {

        const queryParam = {
            where : {name : "lenovo"}
        };
        req.query = {
            name : "lenovo"
        };
        const spyOnFindAll = jest.spyOn(Product, "findAll").mockImplementation((queryParam) => Promise.resolve(newProductData));
        await productController.findAll(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalledWith(queryParam);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProductData);
    });
    // error finding all product
    it("call product.find all product and get error", async () => {
        const spyOnFindAll = jest.spyOn(Product, "findAll").mockImplementation(() => Promise.reject(Error("this is new error")));
        await productController.findAll(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Product.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal error occurred while finding all product"});

    });

});

// find all product by category id
describe("find all product by category id", () => {
    

    // successfully find all product bt categoryid
    it("find all product by category id success", async() => {
        
        req.params = {
            categoryId : newProductData.categoryId
        };
        const queryParam = {
            where : {categoryId : newProductData.categoryId}
        }
        
        const spyOnFindAll = jest.spyOn(Product, "findAll").mockImplementation(() => Promise.resolve(newProductData));
        await productController.findAllProductByCategoryId(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        
        await expect(Product.findAll).toHaveBeenCalledWith(queryParam);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newProductData);

    });
    // error finding product by category id
    it("find all product by category id error", async() => {
        
        req.params = {
            categoryId : newProductData.categoryId
        };
        const queryParam = {
            where : {categoryId : newProductData.categoryId}
        }
        const spyOnFindAll = jest.spyOn(Product, "findAll").mockImplementation(() => Promise.reject(Error("new erroe")));
        await productController.findAllProductByCategoryId(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        
        await expect(Product.findAll).toHaveBeenCalledWith(queryParam);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal error occurred while finding all product by category id"});

    });
})


