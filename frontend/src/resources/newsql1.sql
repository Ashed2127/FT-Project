-- database name: "db_restaurant"
CREATE TABLE admin (
  admin_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  admin_email varchar(255),
  admin_password VARCHAR(255)
)ENGINE=INNODB;

CREATE TABLE deliver_person (
  dp_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  dp_email varchar(255),
  dp_password varchar(255)
)ENGINE=INNODB;

-- CREATE TABLE food( 
--     food_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
--     food_name VARCHAR(255), 
--     food_price VARCHAR(255),
--     food_discount VARCHAR(255),
--     food_type VARCHAR(255),
--     food_category VARCHAR(255),
--     food_src VARCHAR(255)
-- ) ENGINE=INNODB;

-- INSERT INTO food (food_name, food_price, food_discount, food_type, food_category, food_src) 
-- VALUES 
-- ("dulet", "165.00", "5.00", "meat", "breakfast", "breakfast/taco-1.png"), 
-- ("tibs", "185.00", "5.00", "meat", "breakfast", "breakfast/taco-2.png"), 
-- ("tibs-ferfer", "160.00", "10.00", "meat", "breakfast", "breakfast/taco-3.png"), 
-- ("special(addaa)", "450.00", "50.00", "meat", "lunch", "lunch/burrito-1.png"), 
-- ("bozena-shiro", "180.00", "3.00", "meat", "lunch", "lunch/burrito-2.png"), 
-- ("fast shiro(shiroo saffisaa)", "85.00", "5.00", "vegan", "lunch", "lunch/burrito-3.png"), 
-- ("special pizza", "280.00", "10.00", "meat", "dinner", "dinner/nachos-1.png"), 
-- ("pasta-enkulal(hanqaaquu paastaa)", "110.00", "10.00", "meat", "dinner", "dinner/nachos-2.png"), 
-- ("shiro", "152.00", "2.00", "meat", "dinner", "dinner/nachos-3.png"), 
-- ("coffee(buna)", "24.00", "4.00", "vegan", "hot-drink", "hot-drink/side-1.png"), 
-- ("macchiato", "35.00", "3.00", "meat", "hot-drink", "hot-drink/side-2.png"), 
-- ("special milk(aannan addaa)", "38.00", "35.00", "vegan", "hot-drink", "hot-drink/side-3.png"), 
-- ("Cake(Keekii)", "45.00", "5.00", "vegan", "dessert", "dessert/dessert-1.png"), 
-- ("bombolino", "40.00", "5.00", "vegan", "dessert", "dessert/dessert-2.png"), 
-- ("Doughnut", "45.00", "5.00", "vegan", "dessert", "dessert/dessert-3.png"), 
-- ("coca cola", "33.00", "3.00", "vegan", "soft-drink", "soft-drink/drink-1.png"), 
-- ("ambo weeha(amboo weeha)", "33.00", "3.00", "vegan", "soft-drink", "soft-drink/drink-2.png"), 
-- ("pepsi(pepsii)", "33.00", "3.00", "vegan", "soft-drink", "soft-drink/drink-3.png");

CREATE TABLE food( 
    food_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    food_name VARCHAR(255), 
    food_price VARCHAR(255),
    food_discount VARCHAR(255),
    food_type VARCHAR(255),
    food_category VARCHAR(255),
    food_src VARCHAR(255)
) ENGINE=INNODB;

INSERT INTO food (food_name, food_price, food_discount, food_type, food_category, food_src) 
VALUES 
("chechebsa", "280.00", "10.00", "meat", "breakfast", "breakfast/chechebsa-1.png"), 
("burger", "110.00", "10.00", "meat", "breakfast", "breakfast/burger-1.png"), 
("tematem silse", "152.00", "2.00", "meat", "breakfast", "breakfast/tematem-silse-1.png"), 

("dulet", "165.00", "5.00", "meat", "dinner", "dinner/dulet-1.png"), 
("tibs", "185.00", "5.00", "meat", "dinner", "dinner/tibs-1.png"), 
("tibs-ferfer", "160.00", "10.00", "meat", "dinner", "dinner/tibs-ferer-1.png"), 

("special", "450.00", "50.00", "meat", "lunch", "lunch/special-1.png"), 
("bozena-shiro", "180.00", "3.00", "meat", "lunch", "lunch/bozena-shiro-1.png"), 
("fast shiro", "85.00", "5.00", "bean", "lunch", "lunch/fast-shiro-1.png"), 

("Cake", "45.00", "5.00", "powder", "dessert", "dessert/cake-1.png"), 
("bombolino", "40.00", "5.00", "powder", "dessert", "dessert/bombolino-1.png"), 
("Doughnut", "45.00", "5.00", "powder", "dessert", "dessert/donut-1.png"),

("coffee", "24.00", "4.00", "coffe", "hot-drink", "hot-drink/coffee-1.png"), 
("macchiato", "35.00", "3.00", "meat", "hot-drink", "hot-drink/machiatto-1.png"), 
("special milk", "38.00", "35.00", "milk", "hot-drink", "hot-drink/special-milk-1.png"), 

("coca cola", "33.00", "3.00", "drink", "soft-drink", "soft-drink/coca-cola-1.png"), 
("ambo weeha", "33.00", "3.00", "drink", "soft-drink", "soft-drink/ambo-weeha-1.png"), 
("pepsi", "33.00", "3.00", "drink", "soft-drink", "soft-drink/pepsi-1.png");




CREATE TABLE user( 
    user_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    user_fname VARCHAR(255),
    user_lname VARCHAR(255), 
    user_email VARCHAR(255),
    user_phone VARCHAR(255),
    user_password VARCHAR(255)
) ENGINE=INNODB;


CREATE TABLE cart (
  user_id INT,
  food_id INT,
  item_qty INT,
  primary key (user_id, food_id)
);


CREATE TABLE booktable( 
    book_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    book_name VARCHAR(255), 
    book_phone VARCHAR(255),
    book_people INT,
    book_tables INT,
    user_id INT(11) ,
    book_when VARCHAR(255),
    book_note TEXT,
    book_status int(11) 
) ENGINE=INNODB;


CREATE TABLE billdetails (
  bill_id INT,
  food_id INT,
  item_qty INT,
  primary key (bill_id, food_id)
);

CREATE TABLE billstatus (
  bill_id INT,
  user_id INT,
  deliverperson_id INT,
  bill_phone VARCHAR(255),
  bill_address TEXT,
  bill_when VARCHAR(255),
  bill_method VARCHAR(255),
  bill_discount INT,
  bill_delivery INT,
  bill_total INT,
  bill_paid VARCHAR(255),
  bill_status INT(11),
  primary key (bill_id)
);


CREATE TABLE languagestatus (
  lang_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  langstatus INT CHECK (langstatus IN (0, 1))
);

INSERT INTO languagestatus (lang_id, langstatus) VALUES (1, 0);

-- ////////////////SQL////////////
-- // UPDATE YourTableName
-- // SET YourColumnName = 1
-- // WHERE YourCondition;


-- first user table modified by this sql
-- ALTER TABLE `user`
-- CHANGE COLUMN `user_name` `user_fname` VARCHAR(255),
-- ADD COLUMN `user_lname` VARCHAR(255) AFTER `user_fname`;
ALTER TABLE billstatus ADD COLUMN bill_food VARCHAR(255);

