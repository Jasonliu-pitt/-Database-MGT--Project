var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/products', function(req, res, next) {
  res.render('products');
});

router.get('/search', function(req, res, next) {
  res.render('search');
});

router.get('/single', function(req, res, next) {
  res.render('single');
});

router.get('/cart', function(req, res, next) {
  res.render('cart');
});

router.get('/admlogin', function(req, res, next) {
  res.render('admlogin');
});

router.get('/storehome', function(req, res, next) {
  res.render('storehome');
});

router.get('/storeadmproductinfo', function(req, res, next) {
  res.render('storeadmproductinfo');
});

router.get('/storeadmtransaction', function(req, res, next) {
  res.render('storeadmtransaction');
});

router.get('/storeadmprofile', function(req, res, next) {
  res.render('storeadmprofile');
});

router.get('/regionadmhome', function(req, res, next) {
  res.render('regionadmhome');
});

router.get('/regionadmstoreinfo', function(req, res, next) {
  res.render('regionadmstoreinfo');
});

router.get('/regionadmuser', function(req, res, next) {
  res.render('regionadmuser');
});

router.get('/regionadmchart', function(req, res, next) {
  res.render('regionadmchart');
});

router.get('/regionadmprofile', function(req, res, next) {
  res.render('regionadmprofile');
});

router.get('/regionadmtransaction', function(req, res, next) {
  res.render('regionadmtransaction');
});

module.exports = router;
