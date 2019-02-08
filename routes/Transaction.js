var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();

//get all HomeTransactions
router.route('/Home').get(function (req, res) {
	var selectSql = 'select * from Home_Transaction';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No home transaction record!' });
        } else {
			res.json(rows);
        }
	})
});

//get all BussinessTransactions
router.route('/Bussiness').get(function (req, res) {
	var selectSql = 'select * from Business_Transaction';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Bussiness transaction record!' });
        } else {
			res.json(rows);
        }
	})
});

//get HomeTransactions by userid

router.route('/Home/:user_id').get(function (req, res) {
	var selectSql = 'select * from Home_Transaction where user_ID="'+req.params.user_id+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No transaction record!' });
        } else {
			res.json(rows);
        }
	})
});

//get BussinessTransactions by userid

router.route('/Business/:user_id').get(function (req, res) {
	var selectSql = 'select * from Business_Transaction where user_ID="'+req.params.user_id+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No transaction record!' });
        } else {
			res.json(rows);
        }
	})
});


//post HomeTransaction
router.route('/Home').post(function (req, res) {
	var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var insertSql = 'insert into Home_Transaction(order_number,transaction_date,user_ID,product_ID,store_ID,price,quantity) values (0,?,?,?,?,?,?)';
	var insertParams = [date,req.body.userid,req.body.productid,req.body.storeid,req.body.price,req.body.quantity];
	DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
		if (err) throw err;
			res.json({ Failed: false, message: 'Transaction Created !' });
	})
})


//post BussinessTransaction
router.route('/Bussiness').post(function (req, res) {
	var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var insertSql = 'insert into Business_Transaction(order_number,transaction_date,user_ID,product_ID,store_ID,price,quantity) values (0,?,?,?,?,?,?)';
	var insertParams = [date,req.body.userid,req.body.productid,req.body.storeid,req.body.price,req.body.quantity];
	DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
		if (err) throw err;
			res.json({ Failed: false, message: 'Transaction Created !' });
	})
})


//delete Home by userid

router.route('/Home/deletebyid/:orderid').get(function (req, res) {
	var deleteSql = 'delete from Home_Transaction where order_number="'+req.params.orderid+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

//delete Bussiness by userid

router.route('/Bussiness/deletebyid/:orderid').get(function (req, res) {
	var deleteSql = 'delete from Bussiness_Transaction where order_number="'+req.params.orderid+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

// Return router
module.exports = router;