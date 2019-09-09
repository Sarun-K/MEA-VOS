const userModel = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {
 create: function(req, res, next) {
  
  userModel.create(
     { 
        
         username: req.body.username, 
         email: req.body.email, 
         password: req.body.password,
         role: req.body.role,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         areaCode: req.body.areaCode,
      
      }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "User added successfully!!!", data: null});
      
    });
 },

authenticate: function(req, res, next) {
  userModel.findOne({username:req.body.username}, function(err, userInfo){
   console.log("\x1b[31m","find user",userInfo);
     if (userInfo === null) {
      
      console.log("\x1b[31m"," cant find user");
      res.json({status:"error", message:"Invalid username/password"});
      next(err);
     } 
     else {
      console.log("\x1b[31m","find user",req.body.password);
        
         if(bcrypt.compareSync(req.body.password, userInfo.password)) {

            const token = jwt.sign({id: userInfo._id, role: userInfo.role}, 
            req.app.get('secretKey'), { expiresIn: '1h' });
            res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});

         }
         else{
            res.json({status:"error", message: "Invalid username/password", data:null});
            }
        
         
     }
    });
 },

}
