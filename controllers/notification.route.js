const express = require('express');
const router = express.Router();
const NotificationModel = require('./../models/notification.model');


router.post('/', function(req,res,next){
    const newNotification = new NotificationModel({});
    
    console.log('req.body is>>',req.body);
    newNotification.message = req.body.message;
    newNotification.result = req.body.result;
   
    newNotification.save()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        next(err);
    })
})

module.exports = router;