const detailsQuery = require("./details.query");
const path = require("path");

function get(req, res, next) {
  const condition = {};
  // if(req.loggedInUser.role !== 1){
  //     condition.user = req.loggedInUser._id;
  // }
  detailsQuery
    .find(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function post(req, res, next) {
  console.log("req.body details is>>", req.body);

  if (req.errHandle) {
    return next({
      msg: "Invalid File Format",
      status: 400,
    });
  }

  detailsQuery
    .insert(req.body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      next(err);
    });
}

// function update(req,res,next){

//     detailsQuery.update(req.body)
//         .then(function(data){
//             res.json(data)
//         })
//         .catch(function(err){
//             next(err);
//         })
// }

function remove(req, res, next) {
  const condition = { _id: req.params.id };
  detailsQuery
    .remove(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

module.exports = {
  get,
  post,
  // update,
  remove,
};
