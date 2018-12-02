const { User, Police, Driver, Admin } = require('../config/sequelize')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport')
const DRIVER_TYPE = 1;
const POLICE_TYPE = 2;
const ADMIN_TYPE = 3;
const secretKey = "someSecretKey";
const jwt_decode = require('jwt-decode')

exports.login = (req, res) => {
    let error = {}
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({
        where:{
            'email': email
        }
    })
    .then(user => {
        if(isEmpty(user)){
            error.title = "User not found"
            res.json(error, 401);
        }
        else{


            bcrypt.compare(password, user.password).then(match => {
                if(match == true){
                    //console.log(user)
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
                    res.json(error, 401);
                }
            
            });

        }
    })

    sendJWT = (data) => {
        jwt.sign(
            data,
            secretKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer '+token
                });
            }
        );
    }

    isEmpty = value =>
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);

}


exports.getCurrentUserProfile = (req, res) => {
    const userToken = req.headers['authorization']
    const decoded = jwt_decode(userToken)
    res.json(decoded, 200)
}