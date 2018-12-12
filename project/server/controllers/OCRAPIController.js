const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");

/*
 Method to save the image which was given through the request
*/
 exports.processImage = (req,res) => {
    upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if(!err)
           return res.send(200).end();
     });
}