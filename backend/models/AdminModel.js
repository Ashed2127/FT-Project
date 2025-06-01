// import connection
import db from "../config/database.js";

// get all admin
export const getAllAdmin = (result) => {
    db.query("SELECT * FROM admin", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


// get single admin
export const getAdminByEmail = (data,result) => {
    db.query("SELECT admin_id, admin_password FROM admin WHERE admin_email = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert Admin
export const insertAdmin = (data,result) => {
    db.query("INSERT INTO admin SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// // getAdmin
export const  getAdminData = (result) => {
    db.query("SELECT * FROM admin", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// getEmail
export const  getEmail = (email,result) => {
    db.query("SELECT admin_id, admin_email, admin_password FROM admin WHERE admin_email = ?",[email], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// getAEmail
export const  getAEmail = (email,result) => {
    db.query("SELECT admin_id, admin_email FROM admin WHERE admin_email = ?",[email], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

