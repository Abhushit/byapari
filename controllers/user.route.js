const router = require('express').Router();
const UserModel = require('./../models/users.model');
const MapUser = require('./../helpers/map_user_req');

router.route('/')
.get(function(req,res,next){
    //fetch all users
    console.log('req.loggedInUser >>',req.loggedInUser);
    var condition = {};
    UserModel.find(condition)
    .sort({
        _id:-1
    })
    // .limit(2)
    // .skip(2)
    .exec(function(err,users){
        if(err){
            return next(err);
        }
        res.json(users);
    })
})


router.route('/change-password')
.get(function(req,res,next){
    res.json({
        msg: "from Change password"
    })
})
.put(function(req,res,next){

})
.post(function(req,res,next){

})
.delete(function(req,res,next){

});

router.route('/:id')
.get(function(req,res,next){
    UserModel.findById(req.params.id , function(err,user){
        if(err){
            return next(err);
        }
        res.json(user);
    })

})
.put(function(req,res,next){
    //Update
    UserModel.findById(req.params.id, function(err,user){
        if(err){
            return next(err);
        }
        if(!user){
            return next({
                msg:"user not found",
                status: 404
            })
        }

        var updatedMapUser = MapUser( user, req.body);

        updatedMapUser.save(function(err,done){
            if(err){
                return next(save);
            }
            res.json(done);
        })
    })
    
})
.post(function(req,res,next){

})
.delete(function(req,res,next){
    //delete
    UserModel.findById(req.params.id)
    .exec(function(err,user){
        if(err){
            return next(err);
        }
        if(!user){
            return next({
                msg:"user not found",
                status: 404
            })
        }
        user.remove(function(err,done){
            if(err){
                return next(err);
            }
            res.json(done);
        })
    })
});

module.exports = router;