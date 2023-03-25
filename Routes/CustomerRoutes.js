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

require("../Models/CustomerModel");
const Customer = mongoose.model('Customer');

//Create
router.post("/CreateCustomer", async (req, res) => {
  try {
    let cust = {
      FirstName: req.body.lastName,
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
})

//Read
router.get('/GetCustomers', async (req, res) => {
  var error = "";
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
});

//Update
router.post("/UpdateCustomer", async (req, res) => {
  try {
    return res.status(418).send("Route under construction")
  }
  catch (error) {
    return res.status(500).send(`There was an error: ${error}`);
  }
})
//Delete

router.get("/", async (req, res) => {
  var error = "";
  try {
    res.send("Customer route")
  }
  catch {
    return res.send.status(500).json(`There was an error: ${error}`);
  }
});

module.exports = router;