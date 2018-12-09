const { TicketReason } = require('../config/sequelize')
const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')

exports.insertTicketReason = (req,res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            TicketReason.create(req.body)
            .then(data => res.json(data, 200))
            .catch(err => console.log(err))
        }
        else{
            error.title = "User not authorized"
            res.json(error, 401);
        }
    }
    
}

exports.viewAllTicketReasons = (req, res) => {
    TicketReason.findAll()
    .then(TicketReasons => res.json(TicketReasons, 200));
    /*const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        TicketReason.findAll()
        .then(TicketReasons => res.json(TicketReasons, 200));
    }
*/
    
}

exports.deleteTicketReason = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            TicketReason.destroy({ 
                where: { 
                    id: req.params.id 
                } 
            })
            .then(data => res.json(data, 200));
        }
        else{
            error.title = "User not authorized"
            res.json(error, 401);
        }
    }

    
    
}