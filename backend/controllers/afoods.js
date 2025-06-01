// // import functions from Food model

// import {
//   getAFoods,
//   getAFoodById,
//   insertAFood,
//   updateAFoodById,
//   deleteAFoodById,
//   getAFoodByFoodId,
//   updateAFoodByFoodName,
// } from "../models/AFoodModel.js";

// // get all Foods
// export const showFoods = (req, res) => {
//   getFoods((err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// // get single Food
// export const showFoodById = (req, res) => {
//   getFoodById(req.params.id, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// // create Food
// export const createFood = (req, res) => {
//   const data = req.body;
//   insertFood(data, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// // update Food
// export const updateFood = (req, res) => {
//   const data = req.body;
//   const id = req.params.id;
//   updateFoodById(data, id, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// // delete Food
// export const deleteFood = (req, res) => {
//   const id = req.params.id;
//   // console.log( 'food id is: ', id);
//   deleteFoodById(id, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// // getUserFoods
// export const getFoodsByFoodId = (req, res) => {
//   const id = req.params.id;
//   getFoodByFoodId(id, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// //updateFoodsByFoodName
// export const updateFoodsByFoodName = (req, res) => {
//   const data = req.body;
//   //   const id = req.params.foodName;
//   updateFoodByFoodName(data, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };
