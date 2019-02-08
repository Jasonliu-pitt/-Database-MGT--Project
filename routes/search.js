var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();

//search products

router.route('/searchresult/:keyword').get(function (req, res) {
	var selectSql = 'select * from Product where productName like  "%' + req.params.keyword + '%"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});


//search product by size

router.route('/filterbycategories/').get(function (req, res) {
	var selectSql = 'select * from Product where productName like "%' + req.query.keyword + '%" and kind="'+req.query.kind+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});


//search product by size

router.route('/filterbysize/').get(function (req, res) {
	var selectSql = 'select * from Product where productName like "%' + req.query.keyword + '%" and size="'+req.query.size+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});

//search product by price range

router.route('/filterbypricerange/').get(function (req, res) {
	var selectSql = 'select * from Product where productName like "%' + req.query.keyword + '%" and price between "'+req.query.pricefrom+'" and "'+ req.query.priceto + '"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});

// Return router
module.exports = router;