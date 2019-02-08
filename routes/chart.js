var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();

//get all product Name

router.route('/productsname').get(function (req, res) {
	var selectSql = 'select productName from Product';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No product exist!' });
        } else {
			res.json(rows);
        }
	})
});

// order home products by profit
router.route('/home/orderproductsbyprofit').get(function (req, res) {
	var selectSql = '	SELECT T.product_ID, P.productName, SUM(T.price*T.quantity) AS profit\
	FROM Home_Transaction T, Product P\
	WHERE P.product_ID = T.product_ID AND\
		  P.store_ID = T.store_ID\
	GROUP BY  T.product_ID\
	ORDER BY SUM(T.price*T.quantity)\
';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No record!' });
        } else {
			res.json(rows);
        }
	})
});

// order business products by profit
router.route('/business/orderproductsbyprofit').get(function (req, res) {
	var selectSql = '	SELECT T.product_ID, P.productName, SUM(T.price*T.quantity)AS profit\
	FROM Business_Transaction T, Product P\
	WHERE P.product_ID = T.product_ID AND\
		  P.store_ID = T.store_ID\
	GROUP BY  T.product_ID\
	ORDER BY SUM(T.price*T.quantity)\
';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No record!' });
        } else {
			res.json(rows);
        }
	})
});


// Return router
module.exports = router;