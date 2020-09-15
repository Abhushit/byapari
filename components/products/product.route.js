const router = require('express').Router();
const ProductCtrl = require('./product.controller');
const upload = require('./../../middlewares/upload');
const authorize = require('./../../middlewares/authorize');
const authenticate = require('../../middlewares/authenticate');

router.route('/')
    .get( ProductCtrl.get)
    .post(authenticate, upload.array('img',10),ProductCtrl.post)
    
router.route('/search')
    .get(ProductCtrl.search)
    .post(ProductCtrl.search)

router.route('/:id')
    .get( ProductCtrl.getById)
    .put(authenticate, upload.array('img',10),ProductCtrl.update)
    .delete(authenticate, authorize, ProductCtrl.remove)

module.exports = router;