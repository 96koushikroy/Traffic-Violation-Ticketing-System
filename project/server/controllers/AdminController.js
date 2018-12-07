const { Admin, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')


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

exports.viewAdminProfile = (req, res) => {

    const userToken = req.headers['authorization']
    
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        Admin.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(admins => {
            res.json(admins, 200)
        });
    }

}