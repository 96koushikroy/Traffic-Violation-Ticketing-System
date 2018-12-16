const { Ticket, Driver, Police, TicketReason } = require('../config/sequelize')
const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')
var validator = require('validator');

/*
 API Method to insert a ticket into the database
*/

exports.insertTicket = (req,res) => {
    const userToken = req.headers['authorization']
    error = {}

    if(isEmpty(userToken)){ //check if user is logged in
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 2){ //check if the request is from a police
            const Data = req.body;
            const Car_Number = Data.car_number;

            if(isEmpty(Data.car_number)){
                error.title = "Car Number is Empty"
                res.status(400).json(error);
            }
            else if(isEmpty(Data.amount)){
                error.title = "Amount is empty"
                res.status(400).json(error);
            }
            else if(!validator.isInt(Data.amount)){
                error.title = "Amount has to be a number"
                res.status(400).json(error);
            }
            else if(isEmpty(Data.deadline_date)){
                error.title = "Deadline Date is empty"
                res.status(400).json(error);
            }
            else{

                Driver.findOne({
                    where: {
                        car_number: Car_Number
                    },
                    attributes: ['id']
                })
                .then(DriverId => {
                    if(isEmpty(DriverId)){
                        error.title = "Driver Not Found"
                        res.status(401).json(error);
                    }
                    else{
                        Data.driver_id = DriverId.dataValues.id

                        console.log(Data)
                        Ticket.create(Data)
                        .then(data => res.status(200).json(data))
                        .catch(err => console.log(err))
                    }
                    
                })
                .catch(err => {
                    error.title = "User not authorized"
                    res.status(401).json(error);
                }) 
            }
        }
        else{
            error.title = "User not authorized"
            res.status(401).json(error);
        }
    }

    
}

/*
 API Method for the police to see all their added tickets
*/

exports.viewPoliceTickets = (req, res) => {

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        Ticket.findAll({
            where: {
                police_id: decoded.id
            }
        })
        .then(tickets => res.status(200).json(tickets));
    }
}

/*
 API Method for drivers to see their added tickets
*/

exports.viewDriverTickets = (req, res) =>{
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)

        if(decoded.user_type == 1){
            Ticket.findAll({
                where: {
                    driver_id: decoded.id
                }
            })
            .then(tickets => res.status(200).json(tickets));
        }
        else{
            error.title = "User not authorized"
            res.status(401).json(error);
        }        
    }
}

/*
 API Method to view the individual ticket page
*/

exports.viewOneTicket = (req, res) => {
    //Ticket.hasOne(Police)
    
    //join the police model, Ticket Model and Ticket Reason Model

    console.log(req.params)

    Police.hasMany(Ticket, {foreignKey: 'police_id'})
    Ticket.belongsTo(Police, {foreignKey: 'police_id'})

    Driver.hasMany(Ticket, {foreignKey: 'driver_id'})
    Ticket.belongsTo(Driver, {foreignKey: 'driver_id'})

    TicketReason.hasMany(Ticket, {foreignKey: 'id'})
    Ticket.belongsTo(TicketReason, {foreignKey: 'reason_id'})



    Ticket.findOne({
        where:{
            id: req.params.tid
        },
        include: [Police, Driver, TicketReason]
    })
    .then(tickets => res.status(200).json(tickets));
}

/*
 API Method to delete a ticket where ticket id is given as the parameter
*/

exports.deleteOneTicket = (req, res) => {
    Ticket.destroy({ 
            where: { 
                id: req.params.tid 
            } 
    })
    .then(data => res.status(200).json(data));
}

/*
 API Method for admins to view all unapproved tickets
*/
exports.viewAdminTickets = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            Ticket.findAll({
                where: {
                    status: 0
                }
            })
            .then(tickets => res.status(200).json(tickets));
        }
        else{
            error.title = "User not authorized"
            res.json(error, 401);
        }
    }
}

/*
 API Method for admins to view all the tickets for search purpose
*/

exports.viewAdminAllTickets = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            Ticket.findAll()
            .then(tickets => res.status(200).json(tickets));
        }
        else{
            error.title = "User not authorized"
            res.status(401).json(error);
        }
    }
}
/*
 API Method for admins to approve a pending ticket
*/
exports.approveTickets = (req, res) => {
    let tid = req.params.tid;

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            Ticket.update(
                {
                    status: 1
                },
                {
                    where: {
                        id: tid
                    }
                }
            )
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                error = err
                res.status(401).json(error)
            })
        }
        else{
            error.title = "User not authorized"
            res.status(401).json(error);
        }
    }
}