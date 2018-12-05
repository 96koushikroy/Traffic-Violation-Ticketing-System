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
            return res.json(error, 401)
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
        Police.findAll({
            where: {
                police_id: decoded.id
            }
        })
        .then(polices => res.json(polices, 200));
    }
}
