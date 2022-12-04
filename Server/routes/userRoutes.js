const express = require('express')
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')
const { registerUser, authUser, quotes, like, unlike, quotesRead, secure } = require("../controller/userController")
router.route('/', requireLogin).post(registerUser)
router.route('/login').post(authUser)
router.route('/quotes').post(requireLogin, quotes)
router.route('/quotes').get(quotesRead)
router.route('/likes/:id').put(requireLogin, like)
router.route('/unlikes/:id').put(requireLogin, unlike)


// protected
router.route('/protected').get(requireLogin, secure)

module.exports = router