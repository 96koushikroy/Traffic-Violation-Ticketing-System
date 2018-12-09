var express = require('express');
var router = express.Router();
var TicketReasonController = require('../controllers/TicketReasonController')
var TicketController = require('../controllers/TicketController')
var PoliceController = require('../controllers/PoliceController')
var DriverController = require('../controllers/DriverController')
var AuthController = require('../controllers/AuthController')


router.get('/api/me', AuthController.getCurrentUserProfile);

router.post('/api/ticketreason/insert', TicketReasonController.insertTicketReason);
router.get('/api/ticketreason/view', TicketReasonController.viewAllTicketReasons);
router.get('/api/ticketreason/delete/:id', TicketReasonController.deleteTicketReason);


router.post('/api/ticket/insert', TicketController.insertTicket);
router.get('/api/ticket/police/view', TicketController.viewPoliceTickets);
router.get('/api/ticket/view/details/:tid', TicketController.viewOneTicket);
router.get('/api/ticket/delete/:tid', TicketController.deleteOneTicket);


router.post('/api/police/register', PoliceController.registerPolice);
router.get('/api/police/view', PoliceController.viewAllPolice)
router.get('/api/police/view/:pid', PoliceController.viewOnePolice)
router.get('/api/police/delete/:pid', PoliceController.deletePolice)

router.post('/api/driver/register', DriverController.registerDriver);


router.post('/api/login', AuthController.login);


router.get('/api/ticket/driver/view', TicketController.viewDriverTickets)

router.get('/api/driver/viewprofile',DriverController.viewDriverProfile)
router.post('/api/driver/editprofile',DriverController/editDriverProfile)
router.get('/api/police/viewprofile',PoliceController.viewPoliceProfile)
router.post('/api/police/editprofile',PoliceController/editPoliceProfile)
router.get('/api/admin/viewprofile',AdminController.viewAdminProfile)
router.post('/api/admin/editprofile',AdminController/editAdminProfile)
module.exports = router;
