const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const PORT = 1250;
const dbUrl = "mongodb+srv://admin:Password1@cluster.qtabs.mongodb.net/DemoServices?retryWrites=true&w=majority";
mongoose.connect(dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const version = "1.0.2";

const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'connection error: ');
});
db.once('open', () => {
  console.log('MongoDB Connected');
});

const customerRoutes = require('./Routes/CustomerRoutes.js');

app.get('/', (req, res) => {
  return res.status(200).json(version);
});

app.use('/Customer', customerRoutes)

/**Information:
 * This is the root of the API - handle errors, version, and other related items
 * here. For class specific CRUD operations, create a new route collection file 
 * using the following pattern: "^\w{2,20}Routes.js$" in ./Routes
 */

//These final items need to be at end of route definitions in index
app.get('*', (req, res) => {
  res.status(404).send(
    "Route not found, check method type, params, and spelling"
  );
});

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});