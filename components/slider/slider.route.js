const router = require('express').Router();
const SliderCtrl = require('./slider.controller');
const authenticate = require('../../middlewares/authenticate');
const upload = require('./../../middlewares/upload');

router.route('/')
    .get(authenticate,SliderCtrl.get)
    .post(authenticate,upload.array('img',4),SliderCtrl.post)

router.route('/:id')
    .get(authenticate,SliderCtrl.getById)
    .put(authenticate,upload.array('img',4),SliderCtrl.update)
    .delete(authenticate,SliderCtrl.remove)    

module.exports = router;    