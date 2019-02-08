var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();


router.route('/').post(function (req, res) {
	if (req.body.usertype == 'Individual'){
		var selectSql = 'select * from Home_Customer where username="'+req.body.username+'"';
	}else{
		var selectSql = 'select * from Business_Customer where username="'+req.body.username+'"';
	}
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length != 0) {
          res.json({ Failed: true, message: 'username '+ req.body.username + ' already exist!' });
        }else{
			if (req.body.usertype == 'Individual'){
				var insertSql = 'insert into Home_Customer(Home_customer_ID,username,password,name,address,age,gender,marriage_status,income,email,tel) values (0,?,?,?,?,?,?,?,?,?,?)';
				var insertParams = [req.body.username, req.body.password, req.body.name,req.body.address,req.body.age,req.body.gender,req.body.marriage_status,req.body.income,req.body.email,req.body.tel];
			}else{
				var insertSql = 'insert into Business_Customer(Business_Customer_ID,username,password,name,address,business_category,annual_income,email,tel) values (0,?,?,?,?,?,?,?,?)';
				var insertParams = [req.body.username, req.body.password, req.body.name,req.body.address,req.body.business_category,req.body.annual_income,req.body.email,req.body.tel];
			}
			DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
				if (err) throw err;
				res.json({ Failed: false, message: 'User Created !' });
			})	
		}
	})
});

module.exports = router;