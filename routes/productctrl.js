var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();

//get all product

router.route('/').get(function (req, res) {
	var selectSql = 'select * from Product';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No product exist!' });
        } else {
			res.json(rows);
        }
	})
});

//get all product by store

router.route('/getbystoreid/:store').get(function (req, res) {
	var selectSql = 'select * from Product where store_ID = "' + req.params.store + '"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: selectSql });
        } else {
			res.json(rows);
        }
	})
});

//post product by id

router.route('/getbyid').post(function (req, res) {
	var selectSql = 'select * from Product where product_ID="'+req.body.product_ID+'"and store_ID="'+req.body.store_ID+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows[0]);
        }
	})
});

//get product by name

router.route('/getbyname/').get(function (req, res) {
	var selectSql = 'select * from Product where productName="' +req.query.name +'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});


//get product by categories

router.route('/getbycategories/:kind').get(function (req, res) {
	var selectSql = 'select * from Product where kind="'+req.params.kind+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});

/* POST add inventory*/
router.post('/addinventory', function(req, res) {
	var updateSql = 'update Product set inventory_amount = inventory_amount+"' + req.body.quantity + '" where product_ID="'+req.body.product_ID+'"and store_ID="'+req.body.store_ID+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json({ Failed: false, data: rows});
        }	
	})
});

/* POST remove inventory*/
router.post('/removeinventory', function(req, res) {
	var updateSql = 'update Product set inventory_amount = inventory_amount-"' + req.body.quantity + '" where product_ID="'+req.body.product_ID+'"and store_ID="'+req.body.store_ID+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json({ Failed: false, data: rows});
        }	
	})
});

//get product by size

router.route('/getbysize/:size').get(function (req, res) {
	var selectSql = 'select * from Product where size="'+req.params.size+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});


//get product by price range

router.route('/getbypricerange/').get(function (req, res) {
	var selectSql = 'select * from Product where price between "'+req.query.pricefrom+'" and "'+ req.query.priceto + '"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});


//order product by size

router.route('/orderby/:param').get(function (req, res) {
	var selectSql = 'select * from Product order by "'+req.params.param+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json(rows);
        }
	})
});


// add product
router.route('/addproduct').post(function (req, res) {
	var insertSql = 'insert into Product(product_ID,store_ID,productName,kind,size,inventory_amount,price,img,description) values (0,?,?,?,?,?,?,?,?)';
	var insertParams = [req.body.store_ID, req.body.productName, req.body.kind,req.body.size,req.body.inventory_amount,req.body.price,req.body.img,req.body.description];
	DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
		if (err) throw err;
		res.json({ Failed: false, message: 'Product Created !' });
	})	
});


//update product by id

router.route('/updatebyid').post(function (req, res) {
	var updateSql = 'update Product set productName = "'+req.body.productName+'",kind = "'+req.body.kind+'",size = "'+req.body.size+'",inventory_amount = "'+req.body.inventory_amount+'",price = "'+req.body.price+'",img = "'+req.body.img+'",description = "'+req.body.description+'" where product_ID= "'+req.body.product_ID+'"and store_ID="'+req.body.store_ID+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such product doesnot exist!' });
        } else {
			res.json({ Failed: false, data: rows });
        }
	})
});

//delete product by username

router.route('/deletebyname/:productName').get(function (req, res) {
	var deleteSql = 'delete from Product where productName="'+req.params.productName+'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

//delete product by id

router.route('/deletebyid/').get(function (req, res) {
	var deleteSql = 'delete from Product where product_ID = "'+req.query.productid +'" and store_ID = "'+req.query.storeid +'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		res.json({ Failed: false, message: 'Successfully deleted !' });
	})
});

// Return router
module.exports = router;