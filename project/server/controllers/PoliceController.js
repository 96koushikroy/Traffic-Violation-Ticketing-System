const { Police, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')

exports.registerPolice = (req,res) => {
    
    let error = {}
    /* First check User table if this user exists if exists then throw error else  generate an encrypted password using bcrypt and add the user to User and Police table*/
    User.findAll({
        where:{
            'email': req.body.email
        }
    })
    .then(police => {
        if(police.length != 0){
            console.log(police)
            error.title = "User Already Exists"
            return res.json(error, 401)
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
                            res.json(police,200)                            
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

exports.viewAllPolice = (req,res) => {
    let error = {}
    Police.findAll()
    .then(data => {
        res.json(data, 200);
    })
    .catch(err => {
        error = err
        res.json(error, 500);
    })

}

exports.viewOnePolice = (req,res) => {
    let error = {}
    Police.findOne({
        where: {
            id: req.params.pid
        }
    })
    .then(data => {
        res.json(data, 200);
    })
    .catch(err => {
        error = err
        res.json(error, 500);
    })
}


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
        res.json(data, 200)
    })
    .catch(err => {
        error = err;
        res.json(error, 500);
    })
}
exports.viewPoliceProfile = (req, res) => {

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        Police.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(polices => res.json(polices, 200));
    }
}

exports.editPoliceProfile = (req, res) => {
    Police.update(
      {police_id: req.body.police_id},
      {where: req.params.id}
    )
    .then((data) => {
      res.json(data,200)
    })
    .catch(err => {
        console.log(err)
    })

   })
