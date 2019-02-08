CREATE TABLE home_customer 
	(Home_customer_ID int(20) not null AUTO_INCREMENT, 
	 name varchar(255), 
 	 address varchar(255), 
	 marriage_status varchar(255), 
	 gender varchar(255), 
	 age int(20), 
	 income decimal(15, 2), 
	 email varchar(255),
	 tel varchar(255),
	 username varchar(255) not null, 
 	 password varchar(255) not null,
	 PRIMARY KEY (Home_customer_ID)
	)ENGINE=InnoDB;

CREATE TABLE business_customer 
	(Business_customer_ID int(20) not null AUTO_INCREMENT, 
	 name varchar(255) not null, 
	 address varchar(255) not null, 
	 business_category varchar(255), 
	 annual_income decimal(15, 2),
	 email varchar(255),
	 tel varchar(255),	 
	 username varchar(225) not null, 
	 password varchar(225) not null,
	 PRIMARY KEY (Business_customer_ID)
	)ENGINE=InnoDB;

CREATE TABLE region_manager 
	(region_manager_ID varchar(225) not null, 
	 password varchar(225) not null, 
	 Name varchar(225) not null,
	 PRIMARY KEY (region_manager_ID)
	)ENGINE=InnoDB;


CREATE TABLE store
	(store_ID varchar(225) not null, 
	 Name varchar(225) not null,
	 Address varchar(255), 
	 storeManagerName varchar(225),
	 password varchar(225) not null,
	 PRIMARY KEY (store_ID)
)ENGINE=InnoDB;

CREATE TABLE region 
	(region_ID varchar(225) not null, 
	 region_name varchar(225) not null,
	 store_ID varchar(225) not null,
	 PRIMARY KEY (region_ID,store_ID),
	 FOREIGN KEY (store_ID) REFERENCES store(store_ID)
	)ENGINE=InnoDB;
	
CREATE TABLE product
	(product_ID int(20) not null AUTO_INCREMENT, 
	 store_ID varchar(225) not null, 
	 productName varchar(225) not null, 
	 inventory_amount decimal(15,0) not null, 
	 price decimal(15, 2) not null, 
	 kind varchar(225) not null,
	 size varchar(225),
	 img varchar(225) not null,
	 description varchar(225),
 	 PRIMARY KEY(product_ID, store_ID),
	 FOREIGN KEY (store_ID) REFERENCES store(store_ID)
	 ON DELETE CASCADE ON UPDATE CASCADE	
)ENGINE=InnoDB;

CREATE TABLE home_transaction 
	(order_number int(20) NOT NULL AUTO_INCREMENT, 
	 transaction_date varchar(255) not null, 
	 product_ID int(20) not null, 
	 store_ID varchar(225) not null, 
	 price numeric(15, 2) not null, 
	 quantity numeric(15, 0) not null, 
	 user_ID int(20) not null,
	 PRIMARY KEY (order_number),
 	 FOREIGN KEY (product_ID, store_ID) REFERENCES Product(product_ID, store_ID)
 ON DELETE CASCADE ON UPDATE CASCADE,
	 FOREIGN KEY (user_ID) REFERENCES home_customer(Home_customer_ID)
 ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE Business_Transaction 
	(order_number int(20) NOT NULL AUTO_INCREMENT,
	 transaction_date varchar(255) not null, 
	 product_ID int(20) not null, 
	 store_ID varchar(225) not null, 
	 price numeric(15, 2) not null, 
	 quantity numeric(15, 0) not null, 
	 user_ID int(20) not null,
	 PRIMARY KEY (order_number),
	 FOREIGN KEY (product_ID, store_ID) REFERENCES Product(product_ID, store_ID)
 ON DELETE CASCADE ON UPDATE CASCADE,
	 FOREIGN KEY (user_ID) REFERENCES business_customer(Business_customer_ID)
 ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE manage 
	(region_ID varchar(225) not null, 
	 region_manager_ID varchar(225) not null,
	 PRIMARY KEY (region_ID, region_manager_ID),
	 FOREIGN KEY (region_ID) REFERENCES Region(region_ID)
	 ON DELETE CASCADE
	 ON UPDATE CASCADE,
	 FOREIGN KEY (region_manager_ID) REFERENCES Region_Manager(region_manager_ID)
	 ON DELETE CASCADE
	 ON UPDATE CASCADE
)ENGINE=InnoDB;
