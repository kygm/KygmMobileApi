const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rcpt = new Schema({
  CustId:
  {
    type: String,
    required: true
  },
  ReceiptDate:
  {
    type: String,
    required: true
  },
  ReceiptItems:
  {
    type:
      [{
        Descript: String,
        UnitPrice: Number,
        UnitCost: Number,
        Qty: Number
      }],
    required: false
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
    required: true
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

mongoose.model('Receipt', Rcpt);