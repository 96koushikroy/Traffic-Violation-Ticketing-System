const { TicketReason } = require('../config/sequelize')


exports.insertTicketReason = (req,res) => {
    let trid = Math.floor((Math.random() * 10000) + 1);
    req.body.id = trid;
    
    TicketReason.create(req.body)
    .then(data => res.json(data, 200))
    .catch(err => console.log(err))

}

exports.viewAllTicketReasons = (req, res) => {
    TicketReason.findAll()
    .then(TicketReasons => res.json(TicketReasons, 200));
}

exports.viewOneTicketReasons = (req, res) => {
    TicketReason.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(TicketReasons => res.json(TicketReasons, 200))
    .catch(err => console.log(err))
}

exports.updateTicketReason = (req, res) => {
    TicketReason.update(req.body,
        { 
            where: { 
                id: req.params.id 
            } 
        }
    )
    .then(data => res.json(data, 200));
}

exports.deleteTicketReason = (req, res) => {
    TicketReason.destroy({ 
            where: { 
                id: req.params.id 
            } 
    })
    .then(data => res.json(data, 200));
}