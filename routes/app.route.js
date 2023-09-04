const companyController = require ("../controller/companyController")
const userController = require ("../controller/userController")
const deviceController = require ("../controller/deviceController")
const ticketController = require ("../controller/ticketController")
const customerController = require ("../controller/communicationController")
const device_StatesController = require ("../controller/device_State_Controller")
const express =require("express")
const router = express.Router()
const { authenticationToken, deviceAuthenticationToken } = require('../middleware/auth'); // Adjust the path as needed


//Company Routes
router.post("/company/register",companyController.create);
router.get("/company",companyController.findAll);
router.put("/company/update/:id",authenticationToken, companyController.update);
router.delete("/company/register/:id",companyController.delete);

//User Routes
router.post("/user/create",userController.create);


//Device Routes
router.post("/device/create",deviceAuthenticationToken,deviceController.create);
router.delete("/device/delete/:id",deviceAuthenticationToken,deviceController.delete);
router.put("/device/update/:id",deviceAuthenticationToken,deviceController.update);
router.get("/device/list",deviceAuthenticationToken,deviceController.getList);

//Device State Routes
router.post("/devicestate",deviceAuthenticationToken,device_StatesController.create);
router.put("/devicestate/update",deviceAuthenticationToken,device_StatesController.update);


//Ticket Routes
router.post("/ticket/create",ticketController.createTicket);

//Customer Routes
router.post("/customer/create",customerController.create);


module.exports = router;