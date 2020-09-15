const router = require('express').Router();

const authRoute = require('./../controllers/auth.route');
const userRoute = require('./../controllers/user.route');
const productRoute = require('./../components/products/product.route');
const sliderRoute = require('./../components/slider/slider.route');
const detailsRoute = require('./../components/Details/details.route');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/slider',sliderRoute);
router.use('/details',detailsRoute)



module.exports = router;