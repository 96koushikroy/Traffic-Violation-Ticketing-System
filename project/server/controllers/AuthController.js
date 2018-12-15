const { User, Police, Driver, Admin } = require('../config/sequelize')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport')
const DRIVER_TYPE = 1;
const POLICE_TYPE = 2;
const ADMIN_TYPE = 3;
const secretKey = "someSecretKey";
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')
var uniqid = require('uniqid');
var validator = require('validator');

/*
    Method Used for General Login Purpose
*/
exports.login = (req, res) => {
    let error = {}
    const email = req.body.email;
    const password = req.body.password;
    //email(presence and format check) and password (presence check)
    if(isEmpty(email)){
        error.title = "Email Cannot be empty"
        res.status(400).json(error);
    }
    else if(!validator.isEmail(email)){
        error.title = "Not a valid email address"
        res.status(400).json(error);
    }
    else if(isEmpty(password)){
        error.title = "Password Cannot be empty"
        res.status(400).json(error);
    }
    else{
        //check if the user is present in the users table
        User.findOne({
            where:{
                'email': email
            }
        })
        .then(user => {
            if(isEmpty(user)){
                error.title = "User not found"
                res.status(401).json(error);
            }
            else{
                bcrypt.compare(password, user.password).then(match => {
                    if(match == true){
                        let dddd = {};
                        if(user.user_type == DRIVER_TYPE){
                            Driver.findOne({
                                where: {
                                    id: user.id
                                },
                                attributes:['name']
                            })
                            .then(driver => {
                                dddd = {
                                    'id': user.id,
                                    'name': driver.name,
                                    'email': user.email,
                                    'user_type': user.user_type
                                }
                                sendJWT(dddd);
                            })
                        }
                        else if(user.user_type == POLICE_TYPE){
                            Police.findOne({
                                where: {
                                    id: user.id
                                },
                                attributes:['name']
                            })
                            .then(police => {
                                dddd = {
                                    'id': user.id,
                                    'name': police.name,
                                    'email': user.email,
                                    'user_type': user.user_type
                                }
                                
                                sendJWT(dddd);
                            })
                        }
                        else if(user.user_type == ADMIN_TYPE){
                            Admin.findOne({
                                where: {
                                    id: user.id
                                },
                                attributes:['name']
                            })
                            .then(admin => {
                                dddd = {
                                    'id': user.id,
                                    'name': admin.name,
                                    'email': user.email,
                                    'user_type': user.user_type
                                }
                                sendJWT(dddd);
                            })   
                        }
                    }
                    else{
                        error.title = "Password did not match"
                        res.status(401).json(error);
                    }
                });
    
            }
        })
    /*
        Method Used for sending JWT
    */
        sendJWT = (data) => {
            jwt.sign(
                data,
                secretKey,
                { expiresIn: 3600 },
                (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: 'Bearer '+token
                    });
                }
            );
        }
    }




    

}

/* 
    Method used for Google OAuth Login only 
*/

exports.googleLogin = (req, res) => {
    let error = {}
    const email = req.body.email;

    User.findOne({
        where:{
            email: email
        }
    })
    .then(user => {
        let dddd = {};
        if(isEmpty(user)){
            //a new driver is signing up
            dddd = {
                requestForCarNumber: true
            }
            res.status(200).json(dddd)
        }
        else{
            //login the existing user

            if(user.user_type == DRIVER_TYPE){
                Driver.findOne({
                    where: {
                        id: user.id
                    },
                    attributes:['name']
                })
                .then(driver => {
                    dddd = {
                        'id': user.id,
                        'name': driver.name,
                        'email': user.email,
                        'user_type': user.user_type
                    }
                    sendJWT(dddd);
                })
            }
            else if(user.user_type == POLICE_TYPE){
                Police.findOne({
                    where: {
                        id: user.id
                    },
                    attributes:['name']
                })
                .then(police => {
                    dddd = {
                        'id': user.id,
                        'name': police.name,
                        'email': user.email,
                        'user_type': user.user_type
                    }
                    
                    sendJWT(dddd);
                })
            }
            else if(user.user_type == ADMIN_TYPE){
                Admin.findOne({
                    where: {
                        id: user.id
                    },
                    attributes:['name']
                })
                .then(admin => {
                    dddd = {
                        'id': user.id,
                        'name': admin.name,
                        'email': user.email,
                        'user_type': user.user_type
                    }
                    sendJWT(dddd);
                })   
            }


        }
    })

    sendJWT = (data) => {
        jwt.sign(
            data,
            secretKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.status(200).json({
                    success: true,
                    token: 'Bearer '+token
                });
            }
        );
    }

}

/* 
    Method used for Google OAuth Sign up only for Drivers as they require an additional car number along with usual info
*/
exports.googleSignup = (req, res) => {
    let error = {}
    let dddd = {}
    const email = req.body.email;
    const name = req.body.name;
    const car_number = req.body.car_number
    const DriverObject = {
        email: email,
        name: name,
        password: '',
        car_number: car_number
    }
    let pid = uniqid()
    DriverObject.id = pid


    Driver.create(DriverObject)
    .then(driver => {
        const UserObject = {
            id: pid,
            email: DriverObject.email,
            password: '',
            user_type: 1
        }
        User.create(UserObject)
        .then(data =>{
            dddd = {
                'id': pid,
                'name': name,
                'email': email,
                'user_type': 1
            }
            sendJWT(dddd);
            //res.json(driver,200)                            
        })

    })
    .catch(err => {
        console.log(err)
    })

    sendJWT = (data) => {
        jwt.sign(
            data,
            secretKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.status(200).json({
                    success: true,
                    token: 'Bearer '+token
                });
            }
        );
    }

}
/*
    Method used for getting the current user when the jwt is passed as argument
*/
exports.getCurrentUserProfile = (req, res) => {
    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        /*
        {   
            id: '5gt9n4joxfoz8z',
            name: 'Koushik Roy',
            email: '96koushikroy@gmail.com',
            user_type: 2,
            iat: 1543859699,
            exp: 1543863299 
        }        
        */
        res.status(200).json(decoded)
    }
}