const { Ticket } = require('../config/sequelize')
const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')

exports.insertTicket = (req,res) => {
    Ticket.create(req.body)
    .then(data => res.json(data, 200))
    .catch(err => console.log(err))
}

exports.viewPoliceTickets = (req, res) => {

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        Ticket.findAll({
            where: {
                police_id: decoded.id
            }
        })
        .then(tickets => res.json(tickets, 200));
    }
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