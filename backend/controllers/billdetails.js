import {
  insertBillDetails,
  getBillDetails,
  getAllFood,
  // getFoodId
} from "../models/BillDetailsModel.js";

// create BillDetails
export const createBillDetails=(req,res)=>{
    const data = req.body;
    insertBillDetails(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get BillDetails
export const getBillDetailsById=(req,res)=>{
    getBillDetails(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// getAllFoods;
export const getAllFoods = (req, res) => {
  getAllFood(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

