//if admin continue with http req,res cycle
//if not admin break the cycle with message

module.exports = function(req,res,next){
    console.log('req.loggedinuser >>',req.loggedInUser);
    if(req.loggedInUser.role !== 1){
        return next({
            msg:"sorry, you dont have access",
            status: 403
        })
    }
    next();
}