// here we will write  test for category controller
// import model
const Model = require('../../../models');
const Category = Model.category;

// category controller
const categoryController = require('../../../controllers/category.controller');
// import req and res interceptor
const { mockRequest, mockResponse } = require('../interceptor');
// import category data
const newCategoryData = require('../mockData/newCategoryData.json');

// mocking req, res before every test
let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
});



describe("tests for category controller", () => {
    beforeEach(() => {
        req.body = newCategoryData;
    })

    //check if everything right category must created
    it("it should call category.create successfully create new category in db", async() => {
       
        
        const expectedResFromCreate = {
            ...newCategoryData,
            id : 1
        }
        const spyOnCreate = jest.spyOn(Category, "create").mockImplementation((newCategoryData) => Promise.resolve(expectedResFromCreate));

        await categoryController.create(req, res);

        await expect(spyOnCreate).toHaveBeenCalled();

        expect(Category.create).toHaveBeenCalled();
        expect(Category.create).toHaveBeenCalledWith(newCategoryData);
        
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResFromCreate);
    });
    console.log("i am 1st test from category controller*********************************************************************************");

    // if error in create category
    it("it should call category.create method and return an error", async() => {

        const spyOnCreate = jest.spyOn(Category, "create").mockImplementation(() => Promise.reject(Error("this is an error")));

        await categoryController.create(req, res);
        await expect(spyOnCreate).toHaveBeenCalled();

        await expect(Category.create).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some inter error occured while creating new category"});
    });
    console.log("i am 2nd test from category controller*********************************************************************************");

})

describe("test for category controller for update", () => {
    beforeEach(() => {
        req.body = newCategoryData;
        req.params = {
            id : 1
        };
    })

    //update a category
    it("it should call category controller.update and update catefgory details in  db", async() => {
        const expectedResFromUpdateCategory = {
            message : "category update successfully",
            ...newCategoryData
        };

        const spyOnUpdate = jest.spyOn(Category, "update").mockImplementation(() => Promise.resolve(expectedResFromUpdateCategory))
        await categoryController.update(req, res);
        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(Category.update).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResFromUpdateCategory);
    });

    // error thrown in update
    it("it should call category controller.update and error is thrown", async() => {

        const spyOnUpdate = jest.spyOn(Category, "update").mockImplementation(() => Promise.reject())
        await categoryController.update(req, res);
        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(Category.update).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal errro occured while updating category"});
    });
});

// find one
describe("test foe find one category", () => {
    beforeEach(() => {
        req.params = {
            id : 1
        }
    })

    // all good and successfully got all category
    it("it should return category controller find one and show all category", async()=> {
        const resFromFindByPk = {
            ...newCategoryData,
            id : req.params.id
        }
         
        const spyOnFindByPk = jest.spyOn(Category, "findByPk").mockImplementation(() => Promise.resolve(resFromFindByPk));

        await categoryController.findOne(req, res);
        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Category.findByPk).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(resFromFindByPk);

    })
    // error finding one category
    it("it should return err to call category.findOne ", async()=> {
         
        const spyOnFindByPk = jest.spyOn(Category, "findByPk").mockImplementation(() => Promise.reject(Error("this is error")));

        await categoryController.findOne(req, res);
        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Category.findByPk).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal errro occured while finding one category"});

    });

})

// for delete
describe("test foe find one category", () => {
    beforeEach(() => {
        req.params = {
            id : 1
        }
    });
    console.log("i am 1st test from category controller delete*********************************************************************************");
    // all good and successfully got all category
    it("it should call category.destroy and delete a category", async()=> {
         
        const spyOnDestroy = jest.spyOn(Category, "destroy").mockImplementation(() => Promise.resolve("Successfully deleted"))

        await categoryController.delete(req, res);
        await expect(spyOnDestroy).toHaveBeenCalled();
        await expect(Category.destroy).toHaveBeenCalled();

        expect(res.sendStatus).toHaveBeenCalled();

        expect(res.sendStatus).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith("Successfully deleted");

    })
    // error deleting one category
    it("it should return err to call category.delete ", async()=> {
         
        const spyOnDestroy = jest.spyOn(Category, "destroy").mockImplementation(() => Promise.reject(Error("this is error")));

        await categoryController.delete(req, res);
        await expect(spyOnDestroy).toHaveBeenCalled();
        await expect(Category.destroy).toHaveBeenCalled();

        expect(res.sendStatus).toHaveBeenCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal errro occured while deleting a category"});

    });

})

describe("test find all category", () => {
   
    // find all with empty query
    it("should call categorycontroller.find all category with empty query", async() => {
        const spyOnFindAll = jest.spyOn(Category, "findAll").mockImplementation(() => Promise.resolve(newCategoryData));

        await categoryController.findAll(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newCategoryData);
    })
    
    //find all category with query
    it("should call categorycontroller.find all category with  query", async() => {
        req.query = {
            name : "fashion"
        };
        const queryParam = {
            where : {
                name : "fashion"
            }
        };

        const spyOnFindAll = jest.spyOn(Category, "findAll").mockImplementation((queryParam) => Promise.resolve(newCategoryData));

        await categoryController.findAll(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalledWith(queryParam);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(newCategoryData);
    })

    // if any error in finding categery
    it("should call categorycontroller.find all category with empty query", async() => {
        const spyOnFindAll = jest.spyOn(Category, "findAll").mockImplementation(() => Promise.reject(Error("this is new error")));

        await categoryController.findAll(req, res);
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message : "some internal errro occured while finding all category"});
    })
})