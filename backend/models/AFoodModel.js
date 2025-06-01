// // import connection
// import db from "../config/database.js";

// // get all Foods
// export const getAFoods = (result) => {
//   db.query("SELECT * FROM food", (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

// // get single Foods
// export const getAFoodById = (id, result) => {
//   db.query("SELECT * FROM afood WHERE food_id = ?", [id], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results[0]);
//     }
//   });
// };

// // insert Food
// export const insertAfood= (data, result) => {
//   db.query("INSERT INTO afood SET ?", data, (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results[0]);
//     }
//   });
// };

// // update Food
// export const updateAFoodById = (data, id, result) => {
//   db.query(
//     "UPDATE afood SET food_name = ?, food_price = ? WHERE food_id = ?",
//     [data.food_name, data.food_price, id],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// // delete Food
// export const deleteAFoodById = (id, result) => {
//   db.query("DELETE FROM afood WHERE food_id = ?", [id], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

// // getFoodByFoodId;

// export const getAFoodByFoodId = (id, result) => {
//   // console.log(id);s
//   db.query(
//     "SELECT food_name FROM afood WHERE food_id = ?",
//     [id],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// export const updateAFoodByFoodName = (data, result) => {
//   db.query(
//     "UPDATE afood SET food_price = ?, food_discount = ? WHERE food_name = ?",
//     [data.price, data.discount, data.name],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };
