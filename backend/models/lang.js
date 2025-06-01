import db from "../config/database.js";

export const updateEngIndex = (data, result) => {
  db.query(
    "UPDATE languagestatus SET langstatus = langstatus - 1  WHERE lang_id = 1",
    data,
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
    "UPDATE languagestatus SET langstatus = langstatus + 1 WHERE lang_id = 1",
    data,
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

//getStatus
// export const getStatus = (id, result) => {
//   db.query(
//     "SELECT langstatus FROM languagestatus WHERE lang_id = 1",
//     id,
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

//  langStatus
export const langStatus = (id, result) => {
  db.query(
    "SELECT langstatus FROM languagestatus WHERE lang_id = 1",
    id,
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