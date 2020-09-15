const sliderQuery = require("./slider.query");
const path = require("path");

function get(req, res, next) {
  const condition = {};
  if(req.loggedInUser.role !== 1){
    condition.user = req.loggedInUser._id;
  }
  sliderQuery
    .find(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function getById(req,res,next){
  const condition = {_id: req.params.id}
  sliderQuery.find(condition)
    .then(function(data){
      res.json(data[0])
    })
    .catch(function(err){
      next(err);
    })
}


function post(req, res, next) {
  console.log("req slider files>>", req.files);
  console.log("req slider body >>", req.body);
  var fileName = []

  if (req.errHandle) {
    return next({
      msg: "invalid file format",
      status: 400,
    });
  }

  if (req.files && req.files.length) {
    req.files.map((file) => {
      fileName.push(file.filename);
    //   console.log("name is>>", fileName);
    });
    req.body.images = fileName;
    console.log(' req slider image >>', req.body.images);
  }
  req.body.user = req.loggedInUser._id;

  sliderQuery
    .insert(req.body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      next(err);
    });
}

function update(req, res, next) {
  if (req.files && req.files.length) {
    req.files.map((file) => {
      fileName.push(file.filename);
    //   console.log("name is>>", fileName);
    });
    req.body.images = fileName;
    console.log(' req slider image >>', req.body.images);
  }
  req.body.user = req.loggedInUser._id;
  sliderQuery
    .update(req.params.id, req.body)
    .then(function (data) {
      if (req.files) {
        require("fs").unlink(
          path.join(process.cwd(), "uploads/images/" + data.oldImage),
          function (err, done) {
            if (!err) {
              console.log("old file removed");
            }
          }
        );
      }
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function remove(req, res, next) {
  const condition = { _id: req.params.id };
  sliderQuery
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
  getById,
  post,
  update,
  remove,
};
