var express = require('express');
var router = express.Router();
var TicketReasonController = require('../controllers/TicketReasonController')

router.post('/api/ticketreason/insert', TicketReasonController.insertTicketReason);
router.get('/api/ticketreason/view', TicketReasonController.viewAllTicketReasons);
router.get('/api/ticketreason/view/:id', TicketReasonController.viewOneTicketReasons);
router.post('/api/ticketreason/update/:id', TicketReasonController.updateTicketReason);
router.get('/api/ticketreason/delete/:id', TicketReasonController.deleteTicketReason);




module.exports = router;
