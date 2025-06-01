CREATE TABLE afood( 
    food_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    food_name VARCHAR(255), 
    food_price VARCHAR(255),
    food_discount VARCHAR(255),
    food_desc VARCHAR(255),
    food_status VARCHAR(255),
    food_type VARCHAR(255),
    food_category VARCHAR(255),
    food_src VARCHAR(255)
) ENGINE=INNODB;

INSERT INTO afood (food_name, food_price, food_discount, food_desc, food_status, food_type, food_category, food_src) 
VALUES 

("chechebsa", "280.00", "10.00", "Daakuun, soogidda timaatima, daabboo, toppings.", "Uniquely Irresistible", "meat", "breakfast", "breakfast/chechebsa-1.png"), 
("burger", "110.00", "10.00", "Paastaa, garlic, zayita ejersaa, mi'eessituu.", "Simply Tempting", "meat", "breakfast", "breakfast/burger-1.png"), 
("tematem silse", "152.00", "2.00", "Daakuu chickpea, basaasti, garlic, mi'eessituu.", "Ethiopian Delight", "meat", "breakfast", "breakfast/tematem-silse-1.png"), 

("dulet", "165.00", "5.00", "Foon mi'eessituu mi'eessituu waliin bilcheefame.", "Savory Tradition", "meat", "dinner", "dinner/dulet-1.png"), 
("tibs", "185.00", "5.00", "Foon basaasti fi timaatima waliin qama'ame.", "Spice-infused Delight", "meat", "dinner", "dinner/tibs-1.png"), 
("tibs-ferfer", "160.00", "10.00", "Foon mi'aawaa qamadii fi timaatima waliin.", "Savory Tradition", "meat", "dinner", "dinner/tibs-ferer-1.png"), 

("special(addaa)", "450.00", "50.00", "Recipe aadaa.", "Exclusively Exceptional", "meat", "lunch", "lunch/special-1.png"), 
("bozena-shiro", "180.00", "3.00", "Daakuu chickpea, basaasti, garlic, mi'eessituu.", "Flavorful Elegance", "meat", "lunch", "lunch/bozena-shiro-1.png"), 
("fast shiro(shiroo saffisaa)", "85.00", "5.00", "Daakuu chickpea, basaasti, garlic, mi'eessituu.", "Quick and Delicious", "bean", "lunch", "lunch/fast-shiro-1.png"), 
 
("Cake(shiroo saffisaa)", "45.00", "5.00", "Daakuu, sukkaara, hanqaaquu, dhadhaa, mi'eessituu.", "best seller", "powder", "dessert", "dessert/cake-1.png"), 
("bombolino", "40.00", "5.00", "Daakuu, sukkaara, damma, zayita, guutuu.", "A Burst of Joy", "powder", "dessert", "dessert/bombolino-1.png"), 
("Doughnut", "45.00", "5.00", "Daakuu, sukkaara, damma, zayita, glaze.","Irresistibly Sweet", "powder", "dessert", "dessert/donut-1.png"),

("coffee(buna)", "24.00", "4.00", "Buna, bishaan, aannan (dirqama), sukkaara.", "Awaken Your Senses", "coffe", "hot-drink", "hot-drink/coffee-1.png"), 
("macchiato", "35.00", "3.00", "Espresso, aannan, foomii.", "Indulge in Perfection", "meat", "hot-drink", "hot-drink/machiatto-1.png"), 
("special milk(aannan addaa)", "38.00", "35.00", "Aannan, mi'eessituu.", "Creamy Delight", "milk", "hot-drink", "hot-drink/special-milk-1.png"), 

("coca cola", "33.00", "3.00", "Bishaan kaarbooneetii, sukkaara, mi'eessituu.", "Classic Refreshment", "drink", "soft-drink", "soft-drink/coca-cola-1.png"), 
("ambo weeha", "33.00", "3.00", "Bishaan kaarbooneetii, sukkaara, mi'eessituu.", "Refreshing Bliss", "drink", "soft-drink", "soft-drink/ambo-weeha-1.png"), 
("pepsi", "33.00", "3.00", "Bishaan kaarbooneetii, sukkaara, mi'eessituu.", "Bold and Bubbly", "drink", "soft-drink", "soft-drink/pepsi-1.png");






"chechebsa", "Daakuun, soogidda timaatima, daabboo, toppings.", 

"burger", "Paastaa, garlic, zayita ejersaa, mi'eessituu.", 

"tematem silse", "Daakuu chickpea, basaasti, garlic, mi'eessituu.", 

"dulet", "Foon mi'eessituu mi'eessituu waliin bilcheefame.", 

"tibs", "Foon basaasti fi timaatima waliin qama'ame.",
 
"tibs-ferfer", "Foon mi'aawaa qamadii fi timaatima waliin.", 

"addaa", "Recipe aadaa.", 
"bozena-shiro", "Daakuu chickpea, basaasti, garlic, mi'eessituu.", 

"shiroo saffisaa", "Daakuu chickpea, basaasti, garlic, mi'eessituu.", 

"Keekii", "Daakuu, sukkaara, hanqaaquu, dhadhaa, mi'eessituu.",
 
"bombolino", "Daakuu, sukkaara, damma, zayita, guutuu.", 

"Doughnut", "Daakuu, sukkaara, damma, zayita, glaze.",

"buna", "Buna, bishaan, aannan (dirqama), sukkaara.", 

"macchiato", "Espresso, aannan, foomii.", 

"aannan addaa", "Aannan, mi'eessituu.", 

"coca cola", "Bishaan kaarbooneetii, sukkaara, mi'eessituu.", 

"ambo weeha", "Bishaan kaarbooneetii, sukkaara, mi'eessituu.", 

"pepsi", "Bishaan kaarbooneetii, sukkaara, mi'eessituu."






--------------------------------------------------------
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



CREATE TABLE booktable( 
    book_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    book_name VARCHAR(255), 
    book_phone VARCHAR(255),
    book_people INT,
    book_price INT,
    book_paid VARCHAR(255),
    book_method VARCHAR(255),
    user_id INT(11) ,
    book_when VARCHAR(255),
    book_note TEXT,
    book_status int(11) 
) ENGINE=INNODB;