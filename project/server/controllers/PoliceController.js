const { Police, User } = require('../config/sequelize')
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

exports.registerPolice = (req,res) => {
    
    let error = {}

    User.findAll({
        where:{
            'email': req.body.email
        }
    })
    .then(police => {
        if(police.length != 0){
            console.log(police)
            error.title = "User Already Exists"
            return res.json(error,400)
        }
        else{

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
    .catch(err => console.log(err))
}