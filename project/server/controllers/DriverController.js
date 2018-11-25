const { Driver, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

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