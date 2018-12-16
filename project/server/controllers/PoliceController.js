const { Police, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')
var validator = require('validator');
/*
 API Method for registering a police officer by the admin
*/
exports.registerPolice = (req,res) => {
    const userToken = req.headers['authorization']
    let error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            if(isEmpty(req.body.email)){
                error.title = "Email cannot be empty"
                res.status(400).json(error);
            }
            else if(isEmpty(req.body.password)){
                error.title = "Password cannot be empty"
                res.status(400).json(error);
            }
            else if(!validator.isEmail(req.body.email)){
                error.title = "Not a valid email address"
                res.status(400).json(error);
            }
            else{
                let error = {}
                /* First check User table if this user exists if exists then throw error else  generate an encrypted password using bcrypt and add the user to User and Police table*/
                User.findAll({
                    where:{
                        'email': req.body.email
                    }
                })
                .then(police => {
                    if(!isEmpty(police)){
                        error.title = "User Already Exists"
                        res.status(400).json(error)
                    }
                    else{
                        //generate pass based on 10 salt rounds the result will be on salt var
                        bcrypt.genSalt(10, (err, salt) => {
                            const PoliceObject = req.body
                            let pid = uniqid()
                            PoliceObject.id = pid
            
                            bcrypt.hash(PoliceObject.password, salt, (err, hash) => {
                                if (err) console.log(err);
                                
                                PoliceObject.password = hash;
                                
                                Police.create(PoliceObject)
                                .then(police => {
                                    const UserObject = {
                                        id: pid,
                                        email: PoliceObject.email,
                                        password: PoliceObject.password,
                                        user_type: 2
                                    }
                                    User.create(UserObject)
                                    .then(data =>{
                                        res.status(200).json(police)                            
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
                    res.status(500).json(error);
                })
            }
        }
    }


}
/*
 API Method for vieweing all the police officers by the admin
*/
exports.viewAllPolice = (req,res) => {
    const userToken = req.headers['authorization']
    let error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            Police.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                error = err
                res.status(500).json(error);
            })
        }
    }
}
/*
 API Method for vieweing one of the police officers by using the params requested by the admin
*/
exports.viewOnePolice = (req,res) => {
    const userToken = req.headers['authorization']
    let error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        if(decoded.user_type == 3){
            Police.findOne({
                where: {
                    id: req.params.pid
                }
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                error = err
                res.status(500).json(error);
            })
        }
    }
    
}

/*
 API Method for deleting one of the police officers by using the params requested by the admin
*/
exports.deletePolice = (req, res) => {
    let error = {}
    Police.destroy({ 
        where: { 
            id: req.params.pid 
        } 
    })
    .then(data => {
        User.destroy({ 
            where: { 
                id: req.params.pid 
            } 
        })
        res.status(200).json(data)
    })
    .catch(err => {
        error = err;
        res.status(500).json(error);
    })
}

/*
 API Method for viewing profile of the logged in police officer
*/
exports.viewPoliceProfile = (req, res) => {

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.status(401).json(error);
    }
    else{
        const decoded = jwt_decode(userToken)
        Police.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(polices => res.status(200).json(polices));
    }
}


/*
 API Method for editing profile of the logged in police officer
*/

exports.editPoliceProfile = (req, res) => {
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
                      res.status(200).json(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                    Police.update(Data,{
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
                    
                });
            });
        }
        else{
            Police.update(Data,{
                where: {
                    id: decoded.id
                }
            })
            .then((data) => {
              res.status(200).json(data,200)
            })
            .catch(err => {
                console.log(err)
            })

            User.update(DataU,{
                where: {
                    id: decoded.id
                }
            })
            .then((data) => {
              res.status(200).json(data,200)
            })
            .catch(err => {
                console.log(err)
            })
        }
        
        
    }
}