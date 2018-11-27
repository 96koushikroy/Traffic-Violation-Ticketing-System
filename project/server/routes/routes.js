var express = require('express');
var router = express.Router();
var TicketReasonController = require('../controllers/TicketReasonController')
var TicketController = require('../controllers/TicketController')
var PoliceController = require('../controllers/PoliceController')
var DriverController = require('../controllers/DriverController')
var AuthController = require('../controllers/AuthController')

router.post('/api/ticketreason/insert', TicketReasonController.insertTicketReason);
router.get('/api/ticketreason/view', TicketReasonController.viewAllTicketReasons);
router.get('/api/ticketreason/delete/:id', TicketReasonController.deleteTicketReason);


router.post('/api/ticket/insert', TicketController.insertTicket);
router.get('/api/ticket/view/:uid', TicketController.viewAllTickets);
router.get('/api/ticket/view/details/:tid', TicketController.viewOneTicket);
router.get('/api/ticket/delete/:tid', TicketController.deleteOneTicket);


router.post('/api/police/register', PoliceController.registerPolice);
router.post('/api/driver/register', DriverController.registerDriver);


router.post('/api/login', AuthController.login);

module.exports = router;
