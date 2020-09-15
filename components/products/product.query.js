const ProductModel = require("./product.model");

function map_product_req(product, productDetails) {
  if (productDetails.name) product.name = productDetails.name;
  if (productDetails.brand) product.brand = productDetails.brand;
  if (productDetails.featuredProduct)
    product.featuredProduct = productDetails.featuredProduct;
  if (productDetails.description)
    product.description = productDetails.description;
  if (productDetails.price) product.price = productDetails.price;
  if (productDetails.color) product.color = productDetails.color;
  if (productDetails.category) product.category = productDetails.category;
  if (productDetails.weight) product.weight = productDetails.weight;
  if (productDetails.size) product.size = productDetails.size;
  if (productDetails.manuDate) product.manuDate = productDetails.manuDate;
  if (productDetails.expiryDate) product.expiryDate = productDetails.expiryDate;
  if (productDetails.status) product.status = productDetails.status;
  if (productDetails.modelNo) product.modelNo = productDetails.modelNo;
  if (productDetails.quantity) product.quantity = productDetails.quantity;
  if (productDetails.inCart) product.inCart = productDetails.inCart;

  // if (productDetails.images) product.images = productDetails.images;
  if (productDetails.images)
    product.images =
      typeof productDetails.images === "string"
        ? productDetails.images.split(",")
        : productDetails.images;

  if (productDetails.user) product.user = productDetails.user;
  if (productDetails.tags)
    product.tags =
      typeof productDetails.tags === "string"
        ? productDetails.tags.split(",")
        : productDetails.tags;

  if (
    productDetails.discountedItem ||
    productDetails.discountType ||
    productDetails.discountValue
  ) {
    if (!product.discount) {
      product.discount = {};
    }
    // if (productDetails.discountedItem)
    // if (productDetails.discountedItem)
    //   product.discount.discountedItem = productDetails.discountedItem === "true" ? true : false;
    if (productDetails.discountedItem == "true")
      product.discount.discountedItem = true;
    if (productDetails.discountedItem == "false")
      product.discount.discountedItem = false;

    if (productDetails.discountType)
      product.discount.discountType = productDetails.discountType;
    if (productDetails.discountValue)
      product.discount.discountValue = productDetails.discountValue;
  }

  if (productDetails.ratingMsg || productDetails.ratingPoint) {
    product.ratings.push({
      point: productDetails.ratingPoint,
      message: productDetails.ratingMsg,
      user: productDetails.user,
    });
  }
}

function find(condition) {
  return ProductModel.find(condition)
    .sort({
      _id: -1,
    })
    .populate("user", {
      _id: 1,
      username: 1,
    })
    .exec();
}

function insert(data) {
  // return new Promise(function(resolve,reject){
  //   const newProduct = new ProductModel({});
  //   map_product_req(newProduct,data);
  //   newProduct.save()
  //     .then(function(data){
  //       resolve(data);
  //     })
  //     .catch(function(err){
  //       reject(err);
  //     })
  // })
  const newProduct = new ProductModel({});
  map_product_req(newProduct, data);
  return newProduct.save();
}

function update(id, data) {
  return new Promise(function (resolve, reject) {
    ProductModel.findById(id, function (err, product) {
      if (err) {
        return reject(err);
      }
      var oldImage = product.images[0];
      if (!product) {
        return reject({
          msg: "product not found",
          status: 404,
        });
      }
      map_product_req(product, data);
      product.save(function (err, done) {
        if (err) {
          return reject(err);
        }
        done.oldImage = oldImage;
        resolve(done);
      });
    });
  });
}

function remove(id) {
  return new Promise(function (resolve, reject) {
    ProductModel.findById(id, function (err, product) {
      if (err) {
        return reject(err);
      }
      if (!product) {
        return reject({
          msg: "product not found",
          status: 400,
        });
      }
      return product.remove(function (err, done) {
        if (err) {
          reject(err);
        }
        resolve(done);
      });
    });
  });
}

module.exports = {
  find,
  insert,
  update,
  remove,
  map_product_req,
};
