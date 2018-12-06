const { Ticket, Driver, Police, TicketReason } = require('../config/sequelize')
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
                    Data.driver_id = DriverId.dataValues.id
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

exports.viewDriverTickets = (req, res) =>{
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
                driver_id: decoded.id
            }
        })
        .then(tickets => res.json(tickets, 200));
    }
        
}

exports.viewOneTicket = (req, res) => {
    //Ticket.hasOne(Police)
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


exports.viewAdminTickets = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            Ticket.findAll({
                where: {
                    status: 0
                }
            })
            .then(tickets => res.json(tickets, 200));
        }
        else{
            error.title = "User not authorized"
            res.json(error, 401);
        }
    }
}

exports.approveTickets = (req, res) => {
    let tid = req.params.tid;

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
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
                res.json(data, 200)
            })
            .catch(err => {
                error = err
                res.json(error, 401)
            })
        }
        else{
            error.title = "User not authorized"
            res.json(error, 401);
        }
    }
}