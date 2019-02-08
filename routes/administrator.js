var express = require('express');
var DBAcess = require('../models/DBAcess.js');
var router = express.Router();

// Store magr login

router.route('/storemag/login').post(function (req, res) {
	var selectSql = 'select * from Store where password="'+req.body.password+'"'+' and store_ID="'+req.body.ID+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Storename or password is incorrct' });
        } else {
			res.json({ Failed: false, user: rows[0]});
        }
	})
});


// find all Store by region

router.route('/findstorebyregion/:admid').get(function (req, res) {
	var selectSql = 'select S.store_ID,S.Name,S.Address,S.storeManagerName,R.region_ID,R.region_name\
	from store S, region R, manage M \
	where S.store_ID = R.store_ID and M.region_ID = R.region_ID and M.region_manager_ID = "' + req.params.admid +'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Store exist' });
        } else {
			res.json({ Failed: false, stores: rows});
        }
	})
});

// find Store by storeID

router.route('/findstorebystoreid/:storeid').get(function (req, res) {
	var selectSql = 'select S.store_ID,S.Name,S.Address,S.storeManagerName,R.region_ID,R.region_name\
	from store S, region R, manage M \
	where S.store_ID = R.store_ID and M.region_ID = R.region_ID and R.store_ID = "' + req.params.storeid +'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Store exist' });
        } else {
			res.json({ Failed: false, stores: rows});
        }
	})
});

// find region information by regionadmid

router.route('/findregioninfo/:admid').get(function (req, res) {
	var selectSql = 'select R.region_ID,R.region_name\
	from region R, manage M \
	where M.region_ID = R.region_ID and M.region_manager_ID = "' + req.params.admid +'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Store exist' });
        } else {
			res.json({ Failed: false, regioninfo: rows[0]});
        }
	})
});


// find region information by storeid

router.route('/storeidfindregion/:admid').get(function (req, res) {
	var selectSql = 'select R.region_ID,R.region_name\
	from region R \
	where R.store_ID = "' + req.params.admid +'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Store exist' });
        } else {
			res.json({ Failed: false, regioninfo: rows[0]});
        }
	})
});
// show Store

router.route('/showstore').get(function (req, res) {
	var selectSql = 'select * from Store';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Store exist' });
        } else {
			res.json({ Failed: false, store: rows});
        }
	})
});

//get store by id

router.route('/getstorebyid/:store_ID').get(function (req, res) {
	var selectSql = 'select * from Store where store_ID="'+req.params.store_ID+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such Store doesnot exist!' });
        } else {
			res.json(rows[0]);
        }
	})
});

//update store by id

router.route('/updatestorebyid').post(function (req, res) {
	var updateSql = 'update Store set Name = "'+req.body.name+'",Address = "'+req.body.address+'",storeManagerName = "'+req.body.storemagname+'" where store_ID="'+req.body.storeid+'"';
	DBAcess.query(updateSql,function (err,rows,fields) {
		if (err) res.send(err);
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Such Store doesnot exist!' });
        } else {
			res.json({ Failed: false, data: rows });
        }
	})
});

//delete store by id

router.route('/deletestorebyid/').get(function (req, res) {
	var deleteSql = 'delete from region where store_ID = "'+req.query.storeid +'"';
	DBAcess.query(deleteSql,function (err,rows,fields) {
		if (err) res.send(err);
		deleteSql = 'delete from store where store_ID = "'+req.query.storeid +'"';
		DBAcess.query(deleteSql,function (err,rows,fields) {
			insertSql = 'insert into manage(region_ID,region_manager_ID) values (?,?)';
			insertParams = [req.query.regionid,req.query.admid,req.query.storeid];
			DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
				res.json({ Failed: false, message: 'Successfully deleted !' });
			})
		})
	})
});


// show regionmanager

router.route('/showregionmanager').get(function (req, res) {
	var selectSql = 'select * from Region_manager';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'No Region Manager exist' });
        } else {
			res.json({ Failed: false, store: rows});
        }
	})
});


// find information of store

router.route('/findstorebyid/:admid').get(function (req, res) {
	var selectSql = 'select * from Store where store_ID ="' + req.params.admid + '"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'cannot find that store' });
        } else {
			res.json({ Failed: false, store: rows[0]});
        }
	})
});


// addstore
router.route('/addstore').post(function (req, res) {
	var selectSql = 'select * from Store where store_ID ="'+req.body.ID+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length != 0) {
          res.json({ Failed: true, message: 'StoreID '+ req.body.ID + ' already exist!' });
        }else{
			var insertSql = 'insert into Store(store_ID,Name,Address,storeManagerName,password) values (?,?,?,?,?)';
			var insertParams = [req.body.ID,req.body.name, req.body.address,req.body.storeManagerName,req.body.password];
			DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
				insertSql = 'insert into region(region_ID,region_name,store_ID) values (?,?,?)';
				insertParams = [req.body.regionid,req.body.regionName,req.body.ID];
				DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
					res.json({ Failed: false, message: req.body });	
				})
			})	
		}
	})
});


// addreginmanager
router.route('/addreginmanager').post(function (req, res) {
	var selectSql = 'select * from Region_manager where region_manager_ID ="'+req.body.ID+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length != 0) {
          res.json({ Failed: true, message: 'Region Manager ID '+ req.body.store_ID + ' already exist!' });
        }else{
			var insertSql = 'insert into Region_manager(region_manager_ID,password,Name) values (?,?,?)';
			var insertParams = [req.body.ID,req.body.password,req.body.name];
			DBAcess.query(insertSql,insertParams,function (err,rows,fields) {
				if (err) throw err;
				res.json({ Failed: false, message: 'Store Created !' });
			})	
		}
	})
});

// find information of region manager

router.route('/findregionadmbyid/:admid').get(function (req, res) {
	var selectSql = 'select * from Region_manager where region_manager_ID ="' + req.params.admid + '"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'cannot find that Region Manager' });
        } else {
			res.json({ Failed: false, user: rows[0]});
        }
	})
});


// region magr login

router.route('/regionmag/login').post(function (req, res) {
	var selectSql = 'select * from Region_manager where password="'+req.body.password+'"'+' and region_manager_ID="'+req.body.ID+'"';
	DBAcess.query(selectSql,function (err,rows,fields) {
		if (err) throw err;
		if (rows.length == 0) {
          res.json({ Failed: true, message: 'Username or password is incorrct' });
        } else {
			res.json({ Failed: false, user: rows[0]});
        }
	})
});

// Return router
module.exports = router;