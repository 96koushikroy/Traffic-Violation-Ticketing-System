const isEmpty = require('../Validation/isEmpty')
const jwt_decode = require('jwt-decode')
const multer = require("multer");
const path = require("path");
const fs = require('fs');


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
        if(!err)
           return res.send(200).json({success: true});
    });
     /*fs.writeFile('2pac.txt', req.body.b64, (err) => {  
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('Lyric saved!');
    });*/




}