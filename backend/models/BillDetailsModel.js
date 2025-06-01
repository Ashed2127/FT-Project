// import connection
import db from "../config/database.js";

// insert Bill Details
export const insertBillDetails = (data,result) => {
    db.query("INSERT INTO billdetails SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


// get Bill Details
export const getBillDetails = (id,result) => {
    db.query("SELECT * FROM billdetails WHERE bill_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// getAllFood
export const getAllFood = (req, result) => {
  db.query(
    "SELECT * FROM billdetails",(err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

  // getFoodId
// export const getFoodId = (id, result) => {
//   db.query(
//     "SELECT * FROM billdetails WHERE bill_id = ?",
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