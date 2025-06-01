// import connection
import db from "../config/database.js";

// insert Admin
export const insertDp = (data,result) => {
    db.query("INSERT INTO deliver_person SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// get single admin
export const getDpByEmail = (data,result) => {
    db.query("SELECT dp_id,	dp_password FROM deliver_person WHERE dp_email = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// get all dp
export const  getDp = (result) => {
    db.query("SELECT * FROM deliver_person", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// getEmail
export const getEmail = (email,result) => {
    db.query("SELECT dp_email FROM deliver_person WHERE dp_email = ?",[email], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};
