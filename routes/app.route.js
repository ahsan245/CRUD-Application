const companyController = require ("../controller/companyController")
const userController = require ("../controller/userController")
const deviceController = require ("../controller/deviceController")
const express =require("express")
const router = express.Router()
const { authenticationToken, deviceAuthenticationToken } = require('../middleware/auth'); // Adjust the path as needed


//Company Routes
router.post("/company/register",companyController.create);
router.get("/company",companyController.findAll);
router.put("/company/update/:id",authenticationToken, companyController.update);
router.delete("/company/register/:id",companyController.delete);

//User Routes
router.post("/user/create",authenticationToken,userController.create);


//Device Routes
router.post("/device/create",deviceAuthenticationToken,deviceController.create);
router.delete("/device/delete/:id",deviceAuthenticationToken,deviceController.delete);
router.put("/device/update/:id",deviceAuthenticationToken,deviceController.update);





module.exports = router;