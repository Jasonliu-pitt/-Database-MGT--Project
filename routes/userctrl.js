var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();

//get all

router.route('/').get(function (req, res) {
	var selectSql = 'select * from Customer';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No users exist!' });
        } else {
			res.json(rows);
        }
	})
});

//get all Homeuser
router.route('/Home_Customer').get(function (req, res) {
	var selectSql = 'select * from Home_Customer';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No users exist!' });
        } else {
			res.json(rows);
        }
	})
});

//get all Businessuser
router.route('/Business_Customer').get(function (req, res) {
	var selectSql = 'select * from Business_Customer';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No users exist!' });
        } else {
			res.json(rows);
        }
	})
});

//get by id

router.route('/:user_id').get(function (req, res) {
	var selectSql = 'select * from Customer where customer_ID="'+req.params.user_id+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such user doesnot exist!' });
        } else {
			res.json(rows[0]);
        }
	})
});

//get Homeuser by id

router.route('/Home_Customer/:user_id').get(function (req, res) {
	var selectSql = 'select * from Home_Customer where Home_customer_ID="'+req.params.user_id+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such user doesnot exist!' });
        } else {
			res.json(rows[0]);
        }
	})
});

//get Businessuser by id

router.route('/Business_Customer/:user_id').get(function (req, res) {
	var selectSql = 'select * from Business_Customer where Business_Customer_ID="'+req.params.user_id+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such user doesnot exist!' });
        } else {
			res.json(rows[0]);
        }
	})
});

//get by username

router.route('/findbyname/:username').get(function (req, res) {
	var selectSql = 'select * from Customer where username="'+req.params.username+'"';
	var Sql = 'select * from Customer where name="?"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json(rows);
	})
});

//get Homeuser by username
router.route('/Home_Customer/findbyname/:username').get(function (req, res) {
	var selectSql = 'select * from Home_Customer where username="'+req.params.username+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json(rows);
	})
});

//get Businessuser by username
router.route('/Business_Customer/findbyname/:username').get(function (req, res) {
	var selectSql = 'select * from Business_Customer where username="'+req.params.username+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json(rows);
	})
});

//update by id

router.route('/:user_id').post(function (req, res) {
	var updateSql = 'update Customer set password = "'+req.body.password+'",email = "'+req.body.email+'",tel = "'+req.body.tel+'" where id= "'+req.params.user_id+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such user doesnot exist!' });
        } else {
			res.json({ Failed: false, data: req.body });
        }
	})
});

//update Homeuser by id

router.route('/Home_Customer/:user_id').post(function (req, res) {
	var updateSql = 'update Home_Customer set password = "'+req.body.password+'",address = "'+req.body.address+'",email = "'+req.body.email+'",tel = "'+req.body.tel+'" where Home_customer_ID= "'+req.params.user_id+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such user doesnot exist!' });
        } else {
			res.json({ Failed: false, data: req.body });
        }
	})
});

//update Business_Customer by id

router.route('/Business_Customer/:user_id').post(function (req, res) {
	var updateSql = 'update Business_Customer set password = "'+req.body.password+'",address = "'+req.body.address+'",email = "'+req.body.email+'",tel = "'+req.body.tel+'" where Business_Customer_ID= "'+req.params.user_id+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such user doesnot exist!' });
        } else {
			res.json({ Failed: false, data: req.body });
        }
	})
});

//delete by username

router.route('/deletebyname/:username').get(function (req, res) {
	var deleteSql = 'delete from Customer where username="'+req.params.username+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

//delete Homeuser by username

router.route('/Home_Customer/deletebyname/:username').get(function (req, res) {
	var deleteSql = 'delete from Home_Customer where username="'+req.params.username+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

//delete Business_Customer by username

router.route('/Business_Customer/deletebyname/:username').get(function (req, res) {
	var deleteSql = 'delete from Business_Customer where username="'+req.params.username+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

//delete Homeuser by id

router.route('/Home_Customer/deletebyid/:id').get(function (req, res) {
	var deleteSql = 'delete from Home_Customer where Home_customer_ID="'+req.params.id+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

//delete Business_Customer by id

router.route('/Business_Customer/deletebyid/:id').get(function (req, res) {
	var deleteSql = 'delete from Business_Customer where Business_customer_ID="'+req.params.id+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

// Return router
module.exports = router;
