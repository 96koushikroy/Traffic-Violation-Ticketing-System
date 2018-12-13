var express = require('express');
var router = express.Router();
var TicketReasonController = require('../controllers/TicketReasonController')
var TicketController = require('../controllers/TicketController')
var PoliceController = require('../controllers/PoliceController')
var DriverController = require('../controllers/DriverController')
var AuthController = require('../controllers/AuthController')
var AdminController = require('../controllers/AdminController')
var OCRAPIController = require('../controllers/OCRAPIController')

/* API Set for Ticket Controller */
router.get('/api/me', AuthController.getCurrentUserProfile); //testing api to get the current profile data from request header


/* API Set for Ticket Reason Controller */
router.post('/api/ticketreason/insert', TicketReasonController.insertTicketReason);
router.get('/api/ticketreason/view', TicketReasonController.viewAllTicketReasons);
router.get('/api/ticketreason/delete/:id', TicketReasonController.deleteTicketReason);

/* API Set for Ticket Controller */
router.post('/api/ticket/insert', TicketController.insertTicket);
router.get('/api/ticket/police/view', TicketController.viewPoliceTickets);
router.get('/api/ticket/view/details/:tid', TicketController.viewOneTicket);
router.get('/api/ticket/delete/:tid', TicketController.deleteOneTicket);
router.get('/api/ticket/admin/view', TicketController.viewAdminTickets);
router.get('/api/ticket/admin/approve/:tid', TicketController.approveTickets);
router.get('/api/ticket/admin/viewall', TicketController.viewAdminAllTickets);


/* API Set for Police Controller */
router.post('/api/police/register', PoliceController.registerPolice);
router.get('/api/police/view', PoliceController.viewAllPolice)
router.get('/api/police/view/:pid', PoliceController.viewOnePolice)
router.get('/api/police/delete/:pid', PoliceController.deletePolice)

router.post('/api/driver/register', DriverController.registerDriver); // api for driver registration

router.post('/api/login', AuthController.login); //authentication api
router.post('/api/oauth/google/login', AuthController.googleLogin); //oauth authentication api
router.post('/api/oauth/google/signup', AuthController.googleSignup); //oauth signup api

router.get('/api/ticket/driver/view', TicketController.viewDriverTickets) //api to view driver tickets



/* API Set for viewing and editing Users profile */
router.get('/api/driver/viewprofile',DriverController.viewDriverProfile)
router.post('/api/driver/editprofile',DriverController.editDriverProfile)
router.get('/api/police/viewprofile',PoliceController.viewPoliceProfile)
router.post('/api/police/editprofile',PoliceController.editPoliceProfile)
router.get('/api/admin/viewprofile',AdminController.viewAdminProfile)
router.post('/api/admin/editprofile',AdminController.editAdminProfile)
router.get('/api/admin/viewprofile',AdminController.viewAdminProfile)


//Ocr handler(unused)
router.post('/api/ocr/handler',OCRAPIController.processImage)



module.exports = router;
