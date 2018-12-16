const { Driver, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')
var validator = require('validator');

/*
 API Method for registering a new driver by the admin
*/
exports.registerDriver = (req,res) => {
    
    let error = {}
    const Data = req.body;

    //checking if the required datas are empty
    if(Data.email.length == 0){
        error.title = "Email Cannot be empty"
        res.status(400).json(error)
    }
    else if(Data.password.length == 0){
        error.title = "Password Cannot be empty"
        res.status(400).json(error)
    }
    else if(Data.car_number.length == 0){
        error.title = "Car number Cannot be empty"
        res.status(400).json(error)
    }
    else if(!validator.isEmail(Data.email)){
        error.title = "Not a valid email address"
        res.status(400).json(error);
    }
    else{
        //checking if the user exists
        User.findAll({
            where:{
                'email': req.body.email
            }
        })
        .then(driver => {
            if(!isEmpty(driver)){
                error.title = "User Already Exists"
                res.status(400).json(error)
            }
            else{
                //encrypt the password and create the records in the database
                bcrypt.genSalt(10, (err, salt) => {
                    const DriverObject = req.body
                    let pid = uniqid()
                    DriverObject.id = pid
    
                    bcrypt.hash(DriverObject.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        
                        DriverObject.password = hash;
                        
                        Driver.create(DriverObject)
                        .then(driver => {
                            const UserObject = {
                                id: pid,
                                email: DriverObject.email,
                                password: DriverObject.password,
                                user_type: 1
                            }
                            User.create(UserObject)
                            .then(data =>{
                                //return the newly added object
                                res.status(200).json(driver)                            
                            })
    
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    });
                });
            }
        })
        .catch(err => console.log(err))
    }

    
}

/*
 API Method for viewing profile of the logged in driver
*/
exports.viewDriverProfile= (req, res)=>{

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        Driver.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(drivers => res.status(200).json(drivers));
    }

}

/*
 API Method for editing profile of the logged in driver
*/
exports.editDriverProfile = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    const email = req.body.email

    if(isEmpty(email)){
        error.title = "Email Cannot be empty"
        res.status(400).json(error);
    }
    else if(!validator.isEmail(email)){
        error.title = "Not a valid email address"
        res.status(400).json(error);
    }
    else if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else if(isEmpty(req.body.car_number)){
        error.title = "Car Number Cannot be empty"
        res.status(400).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        const Data = {
            name: req.body.name,
            email: req.body.email,
            car_number: req.body.car_number
        }

        const DataU = {
            email: req.body.email
        }
    
        if(!isEmpty(req.body.password)){
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    
                    Data.password = hash;
                    DataU.password = hash;

                    User.update(DataU,{
                        where: {
                            id: decoded.id
                        }
                    })
                    .then((data) => {
                        Driver.update(Data,{
                            where: {
                                id: decoded.id
                            }
                        })
                        .then((data) => {
                          res.json(data,200)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })

                    
                    
                });
            });
        }
        else{
            Driver.update(Data,{
                where: {
                    id: decoded.id
                }
            })
            .then((data) => {
                
                User.update(DataU,{
                    where: {
                        id: decoded.id
                    }
                })
                .then((data) => {
                  res.json(data,200)
                })
                .catch(err => {
                    console.log(err)
                })

            })
            .catch(err => {
                console.log(err)
            })

            
        }
        
        
    }
}
   