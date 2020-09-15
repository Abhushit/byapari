const config = require('./../configs');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/users.model');

module.exports = function(req,res,next){
    let token;
    if(req.headers['authorization'])
        token = req.headers['authorization'];
    if(req.headers['x-access-token'])
        token = req.headers['x-access-token'];
    if(req.headers['token'])
        token = req.headers['token'];
    if(req.query.token)
        token = req.query.token
        
    if(token){
        //validation
        jwt.verify(token,config.JWT_secret, function(err,decoded){
            if(err){
                return next(err);
            }
            UserModel.findById(decoded._id, function(err,user){
                if(err){
                    return next(err);
                }
                if(!user){
                    return next({
                        msg: "User removed from system",
                        status: 400
                    })
                }
                req.loggedInUser = user;  //in every http call a fresh db result is added in req
                next();
            })
            // console.log('Decoded >',decoded);
            
        })
    }else{
        return next({
            msg: 'Token not provided',
            status: 400
        })
    }
}   