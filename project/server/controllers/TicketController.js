const { Ticket, Driver } = require('../config/sequelize')
const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')

exports.insertTicket = (req,res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 2){
            const Data = req.body;
            const Car_Number = Data.car_number;

            Driver.findOne({
                where: {
                    car_number: Car_Number
                },
                attributes: ['id']
            })
            .then(DriverId => {
                if(isEmpty(DriverId)){
                    error.title = "Driver Not Found"
                    res.json(error, 401);
                }
                else{
                    Data.driver_id = DriverId
                    Ticket.create(Data)
                    .then(data => res.json(data, 200))
                    .catch(err => console.log(err))
                }
                
            })
            .catch(err => {
                error.title = "User not authorized"
                res.json(error, 401);
            })

            
        }
        else{

        }
    }

    
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