// import functions from User model

import {
  getAllUser,
  getUserByEmail,
  insertUser,
  getUserphone,
  getEmail,
  getPhone,
  getFirstName,
  getLastName,
  getPassword,
  langStatus,
  updateEngIndex,
  updateOroIndex,
  getUserByPhone,
  updateInfo,
  //   updateStatus,
  updatelangStatus,
  deleteUser,
  getEmailUser,
  getAllUserEmail
} from "../models/UserModel.js";

// get all Users
export const allUsers=(req,res)=>{
    getAllUser((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req,res)=>{
    getUserByEmail(req.params.email,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

/////show user phone///////
export const showAPhone = (req, res) => {
  getUserByPhone(req.params.phone, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
// create user
export const createAccount=(req,res)=>{
    const data = req.body;
    insertUser(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// updateAccount
export const updateAccount = (req,res)=>{
  const data = req.body;
    const id = req.params.id;
  updateInfo(data, id,(err,results)=> {
      if (err) {
          res.send(err);
      }else {
          res.json(results);
      }
  });
};

// deleteAccount
export const deleteAccount = (req,res)=>{
  // const data = req.body;
    const id = req.params.id;
  deleteUser( id,(err,results)=> {
      if (err) {
          res.send(err);
      }else {
          res.json(results);
      }
  });
};
//getUserId
// get single user
export const getUserId = (req,res)=>{
    getUserphone(req.params.phone,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// getUserEmail
export const getUserEmail = (req,res)=>{
    getEmail(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const getUserPhone = (req,res)=>{
    getPhone(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// getUserFirstName
export const getUserFirstName = (req,res)=>{
    getFirstName(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// getUserLastName

export const getUserLastName = (req,res)=>{
    getLastName(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
// getUserPassword

export const getUserPassword = (req,res)=>{
  getPassword(req.params.id,(err,results)=> {
      if (err) {
          res.send(err);
      }else {
          res.json(results);
      }
  });
};
/////////lanaguage status/////////////
export const getLangStatus = (req, res) => {
  langStatus(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};


export const engIndex = (req, res) => {
  //   const data = req.body;
  //   const id = req.params.id;
  updateEngIndex(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const oroIndex = (req, res) => {
  //   const data = req.body;
  //     const id = req.params.id;
  updateOroIndex(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// updateLangStatus;
// export const updateLangStatus = (req, res) => {
//     const { langstatus } = req.body;
//     const {id} = req.params.id;
//   updateStatus(langstatus, id, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// };

// updatestatus;
export const updatestatus = (req, res) => {
    const  langstatus  = req.body;
    const email = req.params.email;
  updatelangStatus(langstatus, email, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//getEmail
export const getEmails = (req, res) => {
  const email = req.params.email;
  getEmailUser(email, (err, results) => {
  if (err) {
    res.send(err);
  } else {
    res.json(results);
  }
});
};
// getAllUserEmails
export const getAllUserEmails = (req, res) => {
  const email = req.params.email;
  getAllUserEmail(email, (err, results) => {
  if (err) {
    res.send(err);
  } else {
    res.json(results);
  }
});
};