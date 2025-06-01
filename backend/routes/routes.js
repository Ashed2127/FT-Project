import express, { Router } from "express";
// import functions from controller
import {
  showFoods,
  showFoodById,
  createFood,
  updateFood,
  deleteFood,
  getFoodsByFoodId,
  updateFoodsByFoodName,

} from "../controllers/food.js";

// import {
//   showAFoods,
//   showAFoodById,
//   createAFood,
//   updateAFood,
//   deleteAFood,
//   getAFoodsByFoodId,
//   updateAFoodsByFoodName,
// } from "../controllers/afoods.js";
import {
  showAUser,
  createAccount,
  updateAccount,
  getUserId,
  getUserEmail,
  getUserPhone,
  getUserFirstName,
  getUserLastName,
  getUserPassword,
  // updateLangStatus,
  showAPhone,
  updatestatus,
  deleteAccount,
  getEmails,
  getAllUserEmails
} from "../controllers/user.js";

import {
  showAAdmin,
  createAdminAccount,
  allAdmin,
  getAllAdminData,
  getAdminEmail,
  getAdEmail
} from "../controllers/admin.js";

import { showADp, createDpAccount,getDpEmail } from "../controllers/dp.js";
import {
  addItems,
  getItem,
  updateItem,
  allItems,
  deleteItem,
  deleteItems,
} from "../controllers/cart.js";

import {
  createBooking,
  getAllBooks,
  updateBooksStatusById,
  getAllBooksByUser,
  getAllBooksByBookName,
  undoBooksStatusById,
} from "../controllers/booktable.js";

import {
  createBillDetails,
  getBillDetailsById,
  getAllFoods,
  // getFoodIdByBillId
} from "../controllers/billdetails.js";

import {
  showNewestStatusId,
  createBillStatus,
  getAllBillsByUser,
  getAllBillsByBill,
  getAllBills,
  updateBillStatus,
  updateBillPaid,
  // cancelBillStatus
  undoBillStatusBtn,
} from "../controllers/billstatus.js";
import { format } from "mysql2";
// import initializeChapaPayment from "../chapa-wrapper.js";
// import customerInfo from "../cha.js";
// init express router
import { responseData, getCheckoutUrl} from "../pay.js";
import { bookResponseData, getBookCheckoutUrl } from "../bookpay.js";
import { engIndex, oroIndex, getLangStatus } from "../controllers/user.js";
import {getAllDp} from "../controllers/dp.js"
const router = express.Router();

////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/foods", showFoods);

// get single Food
router.get("/api/foods/:id", showFoodById);

// create Food
router.post("/api/foods", createFood);

// update Food
router.put("/api/foods/:id", updateFood);

// delete Food
router.delete("/api/foods/:id", deleteFood);
router.put("/api/foodname/", updateFoodsByFoodName);

///////////////////////AFOOD///////////////////////////
// router.get("/api/afoods", showAFoods);
// router.get("/api/afoods/:id", showAFoodById);
// router.post("/api/afoods", createAFood);
// router.put("/api/afoods/:id", updateAFood);
// router.delete("/api/afoods/:id", deleteAFood);
// router.put("/api/afoodname/", updateAFoodsByFoodName);


////////////////////////// USER ///////////////////////
// get all user
router.get("/api/users/:email", showAUser);
router.get("/api/usersphone/:phone", showAPhone);
router.get("/api/useremail/:id", getUserEmail);
router.get("/api/userphone/:id", getUserPhone);
router.get("/api/userfname/:id", getUserFirstName);
router.get("/api/userlname/:id", getUserLastName);
router.get("/api/userpassword/:id", getUserPassword);
// router.post("/api/updatelanggstatus/:id", updateLangStatus);
router.put("/api/loadstatus/:id", updatestatus);
router.get("/api/user-email/:email", getEmails)
// create account
router.post("/api/users/", createAccount);
router.post("/api/users/:id",updateAccount)
router.delete("/api/usersdelete/:id", deleteAccount)
//////////////////////////ADMIN////////////////////
router.get("/api/admin/:email", showAAdmin);
router.get("/api/user-email/:email", getAllUserEmails)
//create admin account
router.post("/api/admin/", createAdminAccount);
router.get("/api/admindata/", allAdmin);
router.get("/api/alladmindata/", getAllAdminData);
router.get("/api/alldp/", getAllDp);
router.get("/api/adminemail/:email", getAdminEmail);
router.get("/api/ademail/:email",getAdEmail)
////////////////////////////DP//////////////////////
///get deliver person
router.get("/api/dp/:email", showADp);
router.get("/api/dpemail/:email", getDpEmail);
//create deliver person
router.post("/api/dp/", createDpAccount);

////////////////////////// CART ////////////////////
// add to cart
router.post("/api/cartItem", addItems);

// get a item in cart
router.get("/api/cartItem/:user_id/:food_id", getItem);

// get all items by user id
router.get("/api/cartItem/:id", allItems);

// update item qty
router.put("/api/cartItem/", updateItem);

// delete a item in cart
router.delete("/api/cartItem/:user_id/:food_id", deleteItem);

// delete all items in cart
router.delete("/api/cartItem/:id", deleteItems);

////////////////////////// Booking ////////////////////////
router.post("/api/booktable", createBooking);
// router.get("/api/booktable")
router.get("/api/booktable", getAllBooks);

//put router boooktable
router.put("/api/booktable/:id", updateBooksStatusById);
router.get("/api/booktable/user/:id", getAllBooksByUser);
router.put("/api/booktable/undo/:id", undoBooksStatusById);

// get table data by user name
router.get("/api/booktable/id/:id", getAllBooksByBookName);
router.get("/api/user/:id", getUserId);

////////////////////////// Bill Details ///////////////////////
router.post("/api/billdetails", createBillDetails);
router.get("/api/billdetails/:id", getBillDetailsById);
// router.get("/api/getfoodid/:id", getFoodIdByBillId);


//////////////////////// Bill Status ////////////////////////
router.get("/api/billstatus/new", showNewestStatusId);
router.post("/api/billstatus", createBillStatus);
router.get("/api/billstatus/user/:id", getAllBillsByUser);
router.get("/api/billstatus/bill/:id", getAllBillsByBill);
router.get("/api/billstatus", getAllBills);
router.put("/api/billstatus/:id", updateBillStatus);
router.put("/api/billstatus/paid/:id", updateBillPaid);

router.put("/api/billstatus/undo/:id", undoBillStatusBtn);

router.get("/api/userfoods/", getAllFoods);
router.get("/api/getuserfoods/:id", getFoodsByFoodId);
// router.get("/api/getuserafoods/:id", getAFoodsByFoodId)
///////////////////////PAYMENT////////////////////////////////
router.post("/api/initiate-payment/", responseData, createBillStatus);
router.get("/api/checkout-url/", async (req, res) => {
  try {
    const checkoutUrl = await getCheckoutUrl(req, res);
    res.send(checkoutUrl); // Send the checkout URL directly
  } catch (error) {
    console.error("Error fetching checkout URL:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/api/initiate-book-payment/",bookResponseData, createBooking);
router.get("/api/checkout-book-url/", async (req, res) => {
  try {
    const checkoutUrl = await getBookCheckoutUrl(req, res);
    res.send(checkoutUrl); // Send the checkout URL directly
  } catch (error) {
    console.error("Error fetching checkout URL:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
////////////////////////language/////////////////////////
router.put("/api/english/:id", engIndex);
router.put("/api/oromo/:id", oroIndex);
router.get("/api/langstatus/:id", getLangStatus);
router.get("/api/langstatus", getLangStatus);

export default router;
