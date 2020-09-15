// const events = require("events");

// const myEvent2 = new events.EventEmitter();
// const myEvent = new events.EventEmitter();

// setTimeout(function () {
//   myEvent2.emit("Abhu", "hi");

// }, 2000);

// myEvent.on("Abhu", function (data) {
//     console.log("new event fired>>", data);
// });

module.exports = function(app){
    const events = require('events');
    const myEvent = new events.EventEmitter();
    app.use(function(req,res,next){
       req.customEvent = myEvent;
       next();
    })
    
    myEvent.on('error', function(error,res){
        console.log('listner executed>>>');
        res.status(error.status || 400).json({
            msg: error.msg || error,
            status: error.status || 400
        })
    })
    
}
