const productQuery = require("./product.query");
const path = require("path");
const upload = require("./../../middlewares/upload");

function get(req, res, next) {
  //logic
  const condition = {};
  // if (req.loggedInUser.role !== 1) {
  //   condition.user = req.loggedInUser._id;
  // }
  productQuery
    .find(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function getById(req, res, next) {
  const condition = { _id: req.params.id };
  productQuery
    .find(condition)
    .then(function (data) {
      res.json(data[0]);
    })
    .catch(function (err) {
      next(err);
    });
}

function search(req, res, next) {
  //req.body for  POST request and req.query for GET request
  var reqData = Object.keys(req.body).length || req.query;
  console.log(" req data is >>", Object.keys(req.body).length);
  console.log(" req body is >>", req.body);
  console.log(" req query is >>", req.query);

  const condition = {}; //todo search condition
  productQuery.map_product_req(condition, reqData);

  //Price Range  min and max
  if (reqData.minPrice) {
    condition.price = {
      $gte: reqData.minPrice,
    };
  }
  if (reqData.maxPrice) {
    condition.price = {
      $lte: reqData.maxPrice,
    };
  }

  if (reqData.minPrice && reqData.maxPrice) {
    condition.price = {
      $gte: reqData.minPrice,
      $lte: reqData.maxPrice,
    };
  }

  //Search using from and to dates

  if (reqData.fromDate && reqData.toDate) {
    var fromDate = new Date(reqData.fromDate).setHours(0, 0, 0, 0);
    var toDate = new Date(reqData.toDate).setHours(23, 59, 59, 999);
    condition.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  console.log("search condition>>", condition);
  productQuery
    .find(condition)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      next(err);
    });
}
function post(req, res, next) {
  //req.body should be appended with images, user
  console.log("req.files >>", req.files);
  console.log("req.body >>", req.body);
  var fileName = [];

  if (req.errHandle) {
    return next({
      msg: "Invalid file format",
      status: 400,
    });
  }

  if (req.files && req.files.length) {
    // console.log("requested files are>>", req.files);
    req.files.map((file) => {
      fileName.push(file.filename);
    //   console.log("name is>>", fileName);
    });

    req.body.images = fileName;
    //productDetails.tags.split(',)
    console.log("req images is>>", req.body.images);
    // req.body.images = req.files[0].filename; // filename will hold the uploaded name of file

    // var mimeType = req.file.mimetype.split('/')[0];
    // if(mimeType != 'image'){
    //     require('fs').unlink(path.join(process.cwd(),'uploads/image/' +req.file.filename), function(err,done){
    //         if(!err){
    //             console.log('file removed');
    //         }
    //     })
    //     return next({
    //         msg:"Invalid file format",
    //         status: 400
    //     })
    // }
    // for(let i = 0 ; i< req.files.length ; i++){
    // console.log('req files in post files >>', req.files[i]);
    // req.body.images = req.files.filename;
    // }

    //filename will hold the uploaded name of the file
  }

  req.body.user = req.loggedInUser._id;

  productQuery
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
    // var mimeType = req.file.mimetype.split('/')[0];
    // if(mimeType != 'image'){
    //     require('fs').unlink(path.join(process.cwd(),'uploads/image/' +req.file.filename), function(err,done){
    //         if(!err){
    //             console.log('file removed');
    //         }
    //     })
    //     return next({
    //         msg:"Invalid file format",
    //         status: 400
    //     })
    
    req.body.images = req.files.filename;
  }
  //TODO remove existing file name

  req.body.user = req.loggedInUser._id;
  productQuery
    .update(req.params.id, req.body)
    .then(function (data) {
      // remove if req.file
      if (req.files && req.files.length) {
        require("fs").unlink(
          path.join(process.cwd(), "uploads/images/" + data.oldImage),
          function (err, done) {
            if (!err) {
              console.log("Old file removed");
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
  // if(req.loggedInUser !== 1){
  //     return next({
  //         msg: "you dont have access",
  //         status: 403
  //     })
  // }
  const condition = { _id: req.params.id };
  productQuery
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
  search,
  update,
  remove,
};
