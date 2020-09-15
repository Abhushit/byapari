const router = require('express').Router();
const DetailsCtrl = require('./details.controller');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');


router.route('/')
    .get(DetailsCtrl.get)
    .post(DetailsCtrl.post)

router.route('/:id')
    .delete(DetailsCtrl.remove)
module.exports = router;