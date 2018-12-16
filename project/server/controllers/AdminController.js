const { Admin, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')
var validator = require('validator');

/*
 API Method for registering an admin (Unused for now)
*/
exports.registerAdmin = (req,res) => {
    
    let error = {}

    User.findAll({
        where:{
            'email': req.body.email
        }
    })
    .then(admin => {
        if(admin.length != 0){
            console.log(admin)
            error.title = "User Already Exists"
            return res.json(error,400)
        }
        else{
            bcrypt.genSalt(10, (err, salt) => {
                const AdminObject = req.body
                let pid = uniqid()
                AdminObject.id = pid

				bcrypt.hash(AdminObject.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    
                    AdminObject.password = hash;
                    
					Admin.create(AdminObject)
                    .then(admin => {
                        const UserObject = {
                            id: aid,
                            email: AdminObject.email,
                            password: AdminObject.password,
                            user_type: 3
                        }
                        User.create(UserObject)
                        .then(data =>{
                            res.json(admin,200)                            
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
				});
			});
        }
    })
    .catch(err => {
        error = err
        res.json(error, 500);
    })
}


/*
 API Method for viewing profile of the logged in admin
*/
exports.viewAdminProfile = (req, res) => {

    const userToken = req.headers['authorization'] // will get the jwt in the auth header
    
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        Admin.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(admins => {
            res.status(200).json(admins)
        });
    }

}

/*
 API Method for editing profile of the logged in admin
*/

exports.editAdminProfile = (req, res) => {
    const userToken = req.headers['authorization']
    const email = req.body.email

    error = {}

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
    else{
        const decoded = jwt_decode(userToken)
        const Data = {
            name: req.body.name,
            email: req.body.email
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
                        Admin.update(Data,{
                            where: {
                                id: decoded.id
                            }
                        })
                        .then((data) => {
                          res.status(200).json(data)
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
            Admin.update(Data,{
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
                  res.status(200).json(data)
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