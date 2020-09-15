const DetailsModel = require("./details.model");

function map_details_req(details, companyDetails) {
  if (companyDetails.companyPhone)
    details.companyPhone = companyDetails.companyPhone;

  if (companyDetails.companyAddress)
    details.companyAddress = companyDetails.companyAddress;
  if (companyDetails.companyEmail)
    details.companyEmail = companyDetails.companyEmail;
  if (companyDetails.fbLink) details.fbLink = companyDetails.fbLink;
  if (companyDetails.instaLink) details.instaLink = companyDetails.instaLink;
  if (companyDetails.twitterLink)
    details.twitterLink = companyDetails.twitterLink;
}

function find(condition) {
  return DetailsModel.find(condition)
    .sort({
      _id: -1,
    })
    // .populate("user", {
    //   _id: 1,
    //   username: 1,
    // })
    .exec();
}

function insert(data) {
  const newDetails = new DetailsModel({});
  map_details_req(newDetails, data);
  return newDetails.save();
}

// function update(data) {
//   map_product_req(newDetails, data);
//   return newDetails.save();
// }

function remove(id){
  console.log('details in back \removed')

  return new Promise(function(resolve, reject){

    DetailsModel.findById(id, function(err, detail){
      if(err){
        return reject(err);
      }
      if(!detail){
        return reject({
          msg:'Detail not found',
          status: 400
        })
      }
     return detail.remove(function(err,done){
       if(err){
         reject(err);
       }
       resolve(done);
     })
    })
  })
}

module.exports = {
  find,
  insert,
  // update,
  remove,
  map_details_req,
};
