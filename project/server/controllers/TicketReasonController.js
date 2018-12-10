const { TicketReason } = require('../config/sequelize')
const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')

/*
    API Method to insert a new Ticket Reason
*/

exports.insertTicketReason = (req,res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken) // decode the token received from the auth header
        if(decoded.user_type == 3){
            const Data = req.body
            if(Data.reason_name.length > 20){
                error.title = "Reason Name too long"
                res.status(400).json(error);
            }
            else if(Data.reason_details.length > 150){
                error.title = "Reason Details too Long"
                res.status(400).json(error);
            }
            else if(Data.reason_name.length == 0){
                error.title = "Reason Name cannot be empty"
                res.status(400).json(error);
            }
            else{
                TicketReason.create(req.body)
                .then(data => res.status(200).json(data))
                .catch(err => console.log(err))
            }

        }
        else{
            error.title = "User not authorized"
            res.status(401).json(error);
        }
    }
    
}


/*
    API Method to view all the ticket reasons
*/
exports.viewAllTicketReasons = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        TicketReason.findAll()
        .then(TicketReasons => res.status(200).json(TicketReasons));
    }
}

/*
    API Method to delete a ticket reason where the ticket reason id is given the params
*/
exports.deleteTicketReason = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            TicketReason.destroy({ 
                where: { 
                    id: req.params.id 
                } 
            })
            .then(data => res.status(200).json(data));
        }
        else{
            error.title = "User not authorized"
            res.status(401).json(error);
        }
    }

    
    
}