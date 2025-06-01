// import connection
import db from "../config/database.js";

// get all user
export const getAllUser = (result) => {
    db.query("SELECT * FROM user", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


// get single user
export const getUserByEmail = (data,result) => {
    db.query("SELECT user_id, user_fname, user_password FROM user WHERE user_email = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

//////////get by phone////////////
export const getUserByPhone = (data, result) => {
  db.query(
    "SELECT user_id, user_fname, user_password FROM user WHERE user_phone = ?",
    [data],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};
// insert User
export const insertUser = (data,result) => {
    db.query("INSERT INTO user SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


//getUserphone

export const getUserphone = (data,result) => {
    db.query("SELECT user_id FROM user WHERE user_phone = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// getEmail
export const getEmail = (data,result) => {
    db.query("SELECT user_email FROM user WHERE user_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// getPhone
export const getPhone = (data,result) => {
    db.query("SELECT user_phone FROM user WHERE user_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


// getFirstName
export const getFirstName = (data,result) => {
    db.query("SELECT user_fname FROM user WHERE user_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// getLastName
export const getLastName = (data,result) => {
    db.query("SELECT user_lname FROM user WHERE user_id = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};
// getPassword
export const getPassword = (data,result) => {
  db.query("SELECT user_password FROM user WHERE user_id = ?",[data], (err,results)=> {
      if (err){
          console.log(err);
          result(err,null);
      }else{
          result(null,results[0]);
      }
  });
};
//////////////////lang status////////////
export const langStatus = (id, result) => {
  db.query(
    "SELECT langstatus FROM user WHERE user_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};


export const updateEngIndex = (data, result) => {
  db.query(
    "UPDATE user SET langstatus = langstatus - 1  WHERE user_id = ?",
    [data],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const updateOroIndex = (data, result) => {
  db.query(
    "UPDATE user SET langstatus = langstatus + 1 WHERE user_id = ?",
    [data],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// updateInfo
export const updateInfo = (data,id, result) => {
  db.query(
    "UPDATE user SET user_fname = ?, user_lname = ?, user_email = ?, user_password = ?, user_phone = ? WHERE user_id = ?",
    [data.user_fname, data.user_lname, data.user_email, data.user_password, data.user_phone, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// deleteUser
// export const deleteUser = (id, result) => {
//   db.query(
//     "DELETE FROM user WHERE user_id = ?",
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
// export const deleteUser = (id, result) => {
//   db.query(
//     "DELETE FROM cart WHERE user_id = ?; " +
//     "DELETE FROM billdetails WHERE user_id = ?; " +
//     "DELETE FROM billstatus WHERE user_id = ?; " +
//     "DELETE FROM booktable WHERE user_id = ?; " +
//     "DELETE FROM user WHERE user_id = ?;",
//     [id, id, id, id, id],
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

// export const deleteUser = (id, result) => {
//   db.query(
//     "DELETE FROM cart WHERE user_id = ?",
//     [id],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         // If the delete from cart is successful, proceed to delete from other tables
//         db.query(
//           "DELETE FROM billdetails WHERE user_id = ?",
//           [id],
//           (err, results) => {
//             if (err) {
//               console.log(err);
//               result(err, null);
//             } else {
//               db.query(
//                 "DELETE FROM billstatus WHERE user_id = ?",
//                 [id],
//                 (err, results) => {
//                   if (err) {
//                     console.log(err);
//                     result(err, null);
//                   } else {
//                     db.query(
//                       "DELETE FROM booktable WHERE user_id = ?",
//                       [id],
//                       (err, results) => {
//                         if (err) {
//                           console.log(err);
//                           result(err, null);
//                         } else {
//                           // If all deletes are successful, finally delete the user
//                           db.query(
//                             "DELETE FROM user WHERE user_id = ?",
//                             [id],
//                             (err, results) => {
//                               if (err) {
//                                 console.log(err);
//                                 result(err, null);
//                               } else {
//                                 result(null, results);
//                               }
//                             }
//                           );
//                         }
//                       }
//                     );
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// };


export const deleteUser = (id, result) => {
  db.query(
    "DELETE FROM billstatus WHERE bill_id IN (SELECT bill_id FROM billdetails WHERE user_id = ?)",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        // After deleting related billstatus records, proceed to delete billdetails
        db.query(
          "DELETE FROM billdetails WHERE user_id = ?",
          [id],
          (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              // If deleting billdetails is successful, proceed with other deletions
              db.query(
                "DELETE FROM cart WHERE user_id = ?",
                [id],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    result(err, null);
                  } else {
                    db.query(
                      "DELETE FROM booktable WHERE user_id = ?",
                      [id],
                      (err, results) => {
                        if (err) {
                          console.log(err);
                          result(err, null);
                        } else {
                          // If all deletes are successful, finally delete the user
                          db.query(
                            "DELETE FROM user WHERE user_id = ?",
                            [id],
                            (err, results) => {
                              if (err) {
                                console.log(err);
                                result(err, null);
                              } else {
                                result(null, results);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

// updateStatus
// export const updateStatus = (langstatus, id ,result) => {
//   db.query(
//     "UPDATE user SET langstatus = ? WHERE user_id = ?",
//     [langstatus, id],
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

// getUserByPhone;
// updatelangStatus;
export const updatelangStatus = (langstatus, email, result) => {
  db.query(
    "UPDATE user SET langstatus = ? WHERE user_email = ?",
    [langstatus, email],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// getEmailUser
export const getEmailUser = (email,result) => {
  db.query("SELECT user_email FROM user WHERE user_email = ?",[email], (err,results)=> {
      if (err){
          console.log(err);
          result(err,null);
      }else{
          result(null,results[0]);
      }
  });
};

// getAllUserEmail
export const getAllUserEmail = (email,result) => {
  db.query("SELECT user_email FROM user WHERE user_email = ?",[email], (err,results)=> {
      if (err){
          console.log(err);
          result(err,null);
      }else{
          result(null,results[0]);
      }
  });
};