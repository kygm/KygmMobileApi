const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Err = new Schema({
  ErrorStr:
  {
    type: String,
    required: true
  },
  ErrDate:
  {
    type: Date,
    required: true
  }
});

mongoose.model('Error', Err);