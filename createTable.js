var mysql = require('mysql');

var con = mysql.createConnection({
    host        :         "localhost",
    user        :         "root",
    password    :         "",
	database     :         "ecommerce",
	multipleStatements:true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql_checckHome = "DROP TABLE IF EXISTS `Home_Customer`";
  var Home_CustomerSql = "CREATE TABLE Home_Customer (\
	Home_customer_ID int(20) NOT NULL AUTO_INCREMENT,\
	name VARCHAR(255) NOT NULL DEFAULT '',\
	address VARCHAR(255) DEFAULT '', \
	marriage_status VARCHAR(255) DEFAULT '', \
	gender VARCHAR(255) DEFAULT '', \
	age int(20) DEFAULT 0,\
	income numeric(15, 2) DEFAULT 0,\
	email VARCHAR(255) DEFAULT '0',\
	tel VARCHAR(255) DEFAULT '',\
	username varchar(255) NOT NULL DEFAULT '', \
	password varchar(255) NOT NULL DEFAULT '',\
	PRIMARY KEY (Home_customer_ID),\
	UNIQUE (username))";
  var sql_checckBusiness = "DROP TABLE IF EXISTS `Business_Customer`";
  var Business_CustomerSql = "CREATE TABLE Business_Customer (\
	Business_customer_ID int(20) NOT NULL AUTO_INCREMENT,\
	name VARCHAR(255) NOT NULL DEFAULT '',\
	address VARCHAR(255) DEFAULT '', \
	business_category VARCHAR(255) DEFAULT '', \
	annual_income numeric(15, 2) DEFAULT 0,\
	email VARCHAR(255) DEFAULT '0',\
	tel VARCHAR(255) DEFAULT '',\
	username varchar(255) NOT NULL DEFAULT '', \
	password varchar(255) NOT NULL DEFAULT '',\
	PRIMARY KEY (Business_customer_ID),\
	UNIQUE (username))";
  var sql_checckProduct = "DROP TABLE IF EXISTS `Product`";
  var ProductSql = "CREATE TABLE Product (\
	product_ID int(20) NOT NULL AUTO_INCREMENT,\
	store_ID int(20) NOT NULL DEFAULT 1,\
	productName VARCHAR(255) NOT NULL DEFAULT '', \
	kind VARCHAR(255) DEFAULT '', \
	size VARCHAR(255) DEFAULT '',\
	inventory_amount numeric(15, 2) DEFAULT 1,\
	price numeric(15, 2) DEFAULT 5,\
	img varchar(255) NOT NULL DEFAULT '', \
	description varchar(255) NOT NULL DEFAULT '',\
	PRIMARY KEY (product_ID,store_ID),\)";
	
  var sql_Home_Transaction = "DROP TABLE IF EXISTS `Home_Transaction`";
  var Home_TransactionSql = "CREATE TABLE Home_Transaction (\
	order_number int(20) NOT NULL AUTO_INCREMENT,\
	transaction_date VARCHAR(255) NOT NULL,\
	user_ID int(20) NOT NULL,\
	product_ID VARCHAR(255) NOT NULL DEFAULT '', \
	store_ID VARCHAR(255) NOT NULL DEFAULT '', \
	price numeric(15, 2) DEFAULT 5,\
	quantity numeric(15, 2) DEFAULT 1,\
	PRIMARY KEY (order_number),\
	FOREIGN KEY (product_ID, store_ID) REFERENCES Product,\
	FOREIGN KEY (user_ID) REFERENCES Home_Customer)";
	
  var sql_Bussiness_Transaction = "DROP TABLE IF EXISTS `Business_Transaction`";
  var Business_TransactionSql = "CREATE TABLE Business_Transaction (\
	order_number int(20) NOT NULL AUTO_INCREMENT,\
	transaction_date VARCHAR(255) NOT NULL,\
	user_ID int(20) NOT NULL,\
	product_ID VARCHAR(255) NOT NULL DEFAULT '', \
	store_ID VARCHAR(255) NOT NULL DEFAULT '', \
	price numeric(15, 2) DEFAULT 5,\
	quantity numeric(15, 2) DEFAULT 1,\
	PRIMARY KEY (order_number),\
	FOREIGN KEY (product_ID, store_ID) REFERENCES Product,\
	FOREIGN KEY (user_ID) REFERENCES Business_Customer)";
	
  var sql_Store = "DROP TABLE IF EXISTS `Store`";
  var StoreSql = "CREATE TABLE Store (\
	store_ID VARCHAR(255) NOT NULL,\
	Name VARCHAR(255) NOT NULL  DEFAULT '',\
	Address VARCHAR(255) NOT NULL,\
	region_ID int(20) NOT NULL,\
	storeManagerName VARCHAR(255) NOT NULL DEFAULT '', \
	password VARCHAR(255) NOT NULL, \
	PRIMARY KEY (store_ID))";

  var sql_Region_Manager = "DROP TABLE IF EXISTS `Region_Manager`";
  var Region_ManagerSql = "CREATE TABLE Region_Manager (\
	region_manager_ID VARCHAR(255) NOT NULL,\
	password VARCHAR(255) NOT NULL DEFAULT '', \
	Name VARCHAR(255) NOT NULL DEFAULT '', \
	PRIMARY KEY (region_manager_ID))";
	
	
  con.query(Region_ManagerSql, function (err, result) {
    if (err) throw err;
    console.log("Successful");
  });
});