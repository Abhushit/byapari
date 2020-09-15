const express = require("express");
const router = express.Router();
const UserModel = require("./../models/users.model");
const MapUser = require("./../helpers/map_user_req");
const passwordHash = require("password-hash");
const config = require("./../configs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "webtechy.zone@gmail.com",
    pass: "webzone007",
  },
});

function prepareMail(data) {
  var mailBody = {
    from: '"Group 24 Ecommerce Store" <noreply@group24commerce@gmail.com>', // sender address
    to: "chaudhary.abhushit@gmail.com ," + data.email, // list of receivers
    subject: "Forgot Password ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `
    <div style="background: #f7f7f7; padding:30px;">
        <h1 style="padding-bottom:15px;">Hello ${data.name} ,</h1>
        <p>We noticed that you are having a trouble logging into our system. 
        Please use the link below to reset the password.</p>
        <p><a href='${data.link}'>click here to reset your password</a></p>

        <p>If you have not requested for password change you can kindly ignore this email.</p>
        <p>Regards ,</p>
        <p>Group 24 Ecommerce Store</p>
    </div>`, // html body
  };
  return mailBody;
}

function createToken(data) {
  return jwt.sign(
    {
      _id: data._id,
    },
    config.JWT_secret
  );
}

router.post("/login", function (req, res, next) {
  UserModel.findOne({
    $or:[
      { username: req.body.username },
      {email: req.body.username}
    ]
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    // password verfication

    if (user) {
      var isPasswordMatch = passwordHash.verify(
        req.body.password,
        user.password
      );
      if (isPasswordMatch) {
        // token stuff
        let token = createToken(user);
        res.json({
          token,
          user,
        });
      } else {
        next({
          msg: "Invalid Password",
          status: 400,
        });
      }
    } else {
      next({
        msg: "Invalid Username",
        status: 400,
      });
    }
  });
});

router.post("/register", function (req, res, next) {
  const newUser = new UserModel({});
  //newUser is an instance of UserModel (mongoose object)
  //newUser is an mongoose object
  console.log("req.body is>>", req.body);
  const latestUser = MapUser(newUser, req.body);

  //    newUser.save(function(err,done){
  //        if(err){
  //            return next(err);
  //        }
  //        res.json(done);
  //    });
  latestUser
    .save()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
});

router.post("/forgot_password", function (req, res, next) {
  // console.log("req.body is >>>", req.body);
  UserModel.findOne({
    email: req.body.email,
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({
        msg: "Invalid Email Address",
        status: 400,
      });
    }
    //email data here
    var passwordResetExpiry = new Date(Date.now()+ 1000*60*60*2);
    var mailData = {
      name: user.username,
      email: user.email,
      link: req.headers.origin + "/reset_password/" + user._id,
    }
    user.passwordResetExpiry = passwordResetExpiry

    user.save(function(err,done){
      if(err){
        return next(err);
      }
      sender.sendMail(prepareMail(mailData), function (err, done) {
        if (err) {
          return next(err);
        }
        res.json(done);
      });
    });
    })
});


router.get('/activate/:email',function(req,res,next){
  // UserModel.findOne({email: email}, function(err,done){
  //   if(err){
  //     return next(err);
  //   }else{
  //     //token generation
  //     //send response
  //   }
  // })
  require('fs').readFile('asjd',function(err,done){
    if(err){
      req.customEvent.emit('error',err, res);
    }
  })
}) 




router.post("/reset_password/:id", function (req, res, next) {
  console.log("req.body is >>>", req.body);
  UserModel.findOne({
    _id: req.params.id,
    passwordResetExpiry: {
      $gte: Date.now()
    }
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({
        msg: "Password reset link expired",
        status: 400,
      });
    }

    user.password = passwordHash.generate(req.body.password);
    user.passwordResetExpiry = null;
    user.save(function (err, done) {
      if (err) {
        return next(err);
      }
      res.json(done);
    });
  });
});

module.exports = router;
