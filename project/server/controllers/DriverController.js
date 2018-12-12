const { Driver, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode')
const isEmpty = require('../Validation/isEmpty')
exports.registerDriver = (req,res) => {
    
    let error = {}

    User.findAll({
        where:{
            'email': req.body.email
        }
    })
    .then(driver => {
        if(driver.length != 0){
            console.log(driver)
            error.title = "User Already Exists"
            return res.json(error,400)
        }
        else{

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
                            res.json(driver,200)                            
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
exports.viewDriverProfile= (req, res)=>{

    const userToken = req.headers['authorization']
    error = {}
    if(isEmpty(userToken)){
        error.title = "User not authorized"
        res.json(error, 401);
    }
    else{
        const decoded = jwt_decode(userToken)
        Driver.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(drivers => res.json(drivers, 200));
    }

}

exports.editDriverProfile = (req, res) => {
    Driver.update(
      {driver_id: req.body.driver_id},
      {where: req.params.id}
    )
    .then((data) => {
      res.json(data,200)
    })
    .catch(err => {
        console.log(err)
    })

   })
   