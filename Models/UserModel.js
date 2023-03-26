const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usr = new Schema({
  Username:
  {
    type: String,
    required: true
  },
  Password:
  {
    type: String,
    required: true
  },
  Email:
  {
    type: String,
    required: true
  },
  AuthLevel:
  {
    type: String,
    required: true
  }
});

mongoose.model('User', Usr);