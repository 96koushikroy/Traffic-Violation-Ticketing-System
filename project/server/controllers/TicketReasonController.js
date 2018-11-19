const { TicketReason } = require('../config/sequelize')


exports.insertTicketReason = (req,res) => {
    TicketReason.create(req.body)
    .then(data => res.json(data, 200))
    .catch(err => console.log(err))
}

exports.viewAllTicketReasons = (req, res) => {
    TicketReason.findAll()
    .then(TicketReasons => res.json(TicketReasons, 200));
}

exports.deleteTicketReason = (req, res) => {
    TicketReason.destroy({ 
            where: { 
                id: req.params.id 
            } 
    })
    .then(data => res.json(data, 200));
}