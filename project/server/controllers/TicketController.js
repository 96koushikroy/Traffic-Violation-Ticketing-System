const { Ticket } = require('../config/sequelize')


exports.insertTicket = (req,res) => {
    Ticket.create(req.body)
    .then(data => res.json(data, 200))
    .catch(err => console.log(err))
}

exports.viewAllTickets = (req, res) => {
    Ticket.findAll({
        where: {
            police_id: req.params.uid
        }
    })
    .then(tickets => res.json(tickets, 200));
}

exports.viewOneTicket = (req, res) => {
    Ticket.findAll({
        where:{
            id: req.params.tid
        }
    })
    .then(tickets => res.json(tickets, 200));
}

exports.deleteOneTicket = (req, res) => {
    Ticket.destroy({ 
            where: { 
                id: req.params.tid 
            } 
    })
    .then(data => res.json(data, 200));
}