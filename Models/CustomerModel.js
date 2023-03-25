const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cust = new Schema({
  FirstName:
  {
    type: String,
    required: true
  },
  LastName:
  {
    type: String,
    required: true
  },
  PhoneNumber:
  {
    type: String,
    required: true
  },
  Address1:
  {
    type: String,
    required: true
  },
  Address2:
  {
    type: String,
    required: false
  },
  City:
  {
    type: String,
    required: true
  },
  State:
  {
    type: String,
    required: true
  },
  Email:
  {
    type: String,
    required: true
  }
});

mongoose.model('Customer', Cust);