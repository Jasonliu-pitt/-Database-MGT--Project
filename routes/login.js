var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();


router.route('/').post(function (req, res) {
	if (req.body.usertype == 'Individual'){
		var selectSql = 'select * from Home_Customer where password="'+req.body.password+'"'+' and username="'+req.body.username+'"';
	}else{
		var selectSql = 'select * from Business_Customer where password="'+req.body.password+'"'+' and username="'+req.body.username+'"';
	}
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Username or password is incorrct' });
        } else {
			res.json({ Failed: false, user: rows[0], usertype : req.body.usertype });
        }
	})
});
module.exports = router;