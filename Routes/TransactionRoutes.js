//Begin required controller dependences/declarations
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const jwt = require("jsonwebtoken");
//End required controller dependencies/declarations




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