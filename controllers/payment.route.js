const express = require('express');
const router = express.Router();
const PaymentModel = require('./../models/payment.model');

router.post('/',function(req,res,next){
    const newPayment = new PaymentModel({});

    console.log('req.body is >>',req.body);

    newPayment.name = req.body.name;
    newPayment.address = {
        address1 : req.body.address1,
        address2 : req.body.address2 ? req.body.address2.split(',') : []
    },
    newPayment.country = req.body.country;
    newPayment.state = req.body.state;
    newPayment.zip = req.body.zip;
    newPayment.phoneNumber = req.body.phone;

    newPayment.save(function(err,done){
        if(err){
            return next(err);
        }
        res.json(done);
    })
})

module.exports = router;
