const SliderModel = require("./slider.model");

function map_slider_req(slider, sliderDetails) {
  if (sliderDetails.images) slider.images = sliderDetails.images;

}

function find(condition) {
  return SliderModel.find(condition)
    .sort({
      _id: -1,
    }).populate('user',{
      _id:1,
      username: 1
    })
    .exec();
}

function insert(data) {
  const newSlider = new SliderModel({});
  map_slider_req(newSlider, data);
  return newSlider.save();
}

function update(id, data) {
  return new Promise(function (resolve, reject) {
    SliderModel.findById(id, function (err, slider) {
      if (err) {
        return reject(err);
      }
      var oldImage = slider.images[0];
      if (!slider) {
        return reject({
          msg: "slider not found",
          status: 404,
        });
      }
      map_slider_req(slider, data);
      slider.save(function (err, done) {
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
    SliderModel.findById(id, function (err, slider) {
      if (err) {
        return reject(err);
      }
      if (!slider) {
        return reject({
          msg: "slider not found",
          status: 400,
        });
      }
      return slider.remove(function (err, done) {
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
  map_slider_req
};
