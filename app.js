const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

require('./db');

//event stuff
require('./events')(app);

//socket stuff
require('./socket')(app); 




//template engine setup PUG
//express way of allocating memory
// const pug = require('pug');
// app.set('View engine',pug);
// app.set('views',path.join(__dirname,'views'));

//set port
app.set('port',process.env.PORT || 9090);


//third party middleware
app.use(morgan('dev'));

//Load routing level middleware
const apiRoute = require('./routes/api.routes');


//enable each and every request access
app.use(cors());

//Inbuilt Middleware
app.use(express.static('uploads'))  //Serving static files for internal use(Express itself)
app.use('/file',express.static(path.join(__dirname,'uploads')))
console.log('working directory path >>', __dirname);
//parse incoming data
//x-www-form-urlencoded  data parser for parsing data
app.use(express.urlencoded({
    extended: true
}))
//json
app.use(express.json());


app.use('/api',apiRoute);



//application level middleware
app.use(function(req,res,next){
    //this is a application level middleware
    //this middleware will act as an 404 error handler
    next({
        msg: 'Not found',
        status: 404 
    })
})


app.use(function(err,req,res,next){
    console.log('error handling middleware',err);
    //for error response we have to set status code
    res.status(err.status || 400).json({
        // text: 'from error handling middleware',
        msg: err.msg || err,
        status: err.status || 400
    })
})


//production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('group24_first/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'group24_first','build','index.html'));
    })
}


app.listen(app.get('port'),function(err,done){
    if(err){
        console.log('Server Listening Error');
    }else{
        console.log('Server Listening at port '+app.get('port'));
    }
})