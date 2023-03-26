/**Customer Routes
* All customer related operations are handled here
*/

/**Important Information:
 * General structure of mongoose query:
 * _ModelName_.Find({_query_}).then(_stuff => 
 * {
 *    //operations with _stuff here
 *    //ex: res.status(200).json(_stuff) // -> this returns a status code of 200 and an unescaped serialized version of _stuff
 * }, 
 * (_res) => 
 * {
 *    //this block is hit if the query is rejected and
 *    //the paramater returned is _res
 * })
 */

//Begin required controller dependences/declarations
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const jwt = require("jsonwebtoken");
//End required controller dependencies/declarations

require("../Models/CustomerModel");
const Customer = mongoose.model('Customer');

//Create
router.post("/CreateCustomer", async (req, res) => {
  var token;
  try {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token)) {
    try {
      let cust = {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        PhoneNumber: req.body.phoneNumber,
        Address1: req.body.address1,
        Address2: req.body?.address2,
        City: req.body.city,
        State: req.body.state,
        Email: req.body.email
      };
      await Customer(cust).save().then(() => {
        return res.status(201).send("Customer created")
      });
    }
    catch (error) {
      return res.status(500).send("An error occurred: " + error);
    }
  }
  else {
    return res.status(401).send("Auth problem");
  }
});

//Read
router.get('/GetCustomers', async (req, res) => {
  var token;
  try {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token)) {
    try {
      await Customer.find({}).then(customers => {
        return res.status(200).json(customers);
      }, (res) => {
        console.log("rejected?" + res)
      });
    }
    catch (error) {
      //console.log("Hit catch block with error: " + error)
      return res.status(500).send(`There was an error: ${error}`);
    }
  }
  else {
    return res.status(401).send("Auth problem");
  }
});

//Update
router.post("/UpdateCustomerById", async (req, res) => {
  var token;
  try {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token)) {
    try {
      let customer;
      try {
        customer = await Customer.findOne({ _id: req.body?.id });
      }
      catch {
        throw new Error("Customer lookup error");
      }
      if (customer) {
        let result = await Customer.updateOne({ _id: req.body.id },
          {
            FirstName: req.body?.firstName,
            LastName: req.body?.lastName,
            PhoneNumber: req.body?.phoneNumber,
            Address1: req.body?.address1,
            Address2: req.body?.address2,
            City: req.body?.city,
            State: req.body?.state,
            Email: req.body?.email
          });
        if (result) {
          return res.status(200).send(`${req.body.id} updated`);
        }
        else {
          return res.status(400).send(`Failed to update customer ${req.body.id}`);
        }
      }
      else {
        return res.status(400).send("No customer found");
      }
    }
    catch (error) {
      return res.status(500).send(`There was an error: ${error}`);
    }
  }
  else {
    return res.status(401).send("Auth problem");
  }
});

//Delete
router.post("/DeleteCustomerById", async (req, res) => {
  var token;
  try {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token)) {
    try {
      let customer;
      try {
        customer = await Customer.findOne({ _id: req.body?.id });
      }
      catch {
        throw new Error("Customer lookup error");
      }
      if (customer) {
        let result = await Customer.deleteOne({ _id: req.body.id });
        if (result) {
          return res.status(200).send(`${req.body.id} deleted`);
        }
        else {
          return res.status(400).send(`Failed to delete customer ${req.body.id}`);
        }
      }
      else {
        return res.status(400).send("No customer found");
      }
    }
    catch (error) {
      return res.status(500).send(`There was an error: ${error}`);
    }

  }
  else {
    return res.status(401).send("Auth problem");
  }
});


//this function is required in every route that uses authentication
function verifyToken(token) {
  try {
    result = jwt.verify(token, "842BD4ED27D41A82770BE39EB5A282CE37DD28A589F37D72D16C43AFF03379A8");
    if (result == undefined) {
      return false;
    }
    else {
      return true;
    }
  }
  catch {
    return false;
  }
}

module.exports = router;