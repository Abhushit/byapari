const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');

// mongodb://localhost:27017/db_name
mongoose.connect("mongodb+srv://abhushit:abhushit@ecommerce.1fw0p.mongodb.net/group24db?retryWrites=true&w=majority" || dbConfig.conxnURL+'/'+dbConfig.dbName,{useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex:true}, function(err,done){
    if(err){
        console.log('db connection failed');
    }else{
        console.log('db connection established');
    }
});

