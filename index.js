const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 1250;
const dbUrl = "mongodb+srv://admin:Password1@cluster.qtabs.mongodb.net/DemoServices?retryWrites=true&w=majority";
mongoose.connect(dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const version = "1.0.2";

const db = mongoose.connection;

db.on('error', () =>
{
  console.error.bind(console, 'connection error: ');
});
db.once('open', () =>
{
  console.log('MongoDB Connected');
});

const customerRoutes = require('./Routes/CustomerRoutes.js');
const authRoutes = require('./Routes/AuthRoutes.js');

app.use('/Customer', customerRoutes);
app.use('/Auth', authRoutes)

/**Information:
 * This is the root of the API - handle errors, version, and other related items
 * here. For class specific CRUD operations, create a new route collection file 
 * using the following pattern: "^\w{2,20}Routes.js$" in ./Routes
 */

app.get('/', (req, res) =>
{
  return res.status(200).json(version);
});

app.get("/AuthTest", (req, res) =>
{
  var token;
  try
  {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem");
  }
  if (token && verifyToken(token))
  {
    //Authorized user operations here
    return res.status(200).send("Auth success");
  }
  else
  {
    return res.status(401).send("Auth problem");
  }
});

//These final items need to be at end of route definitions in index
app.get('*', (req, res) =>
{
  res.status(404).send(
    "Route not found, check method type, params, and spelling"
  );
});

app.listen(PORT, () =>
{
  console.log(`Server Started on port ${PORT}`);
});

//this function is required in every route that uses authentication
function verifyToken(token)
{
  try
  {
    result = jwt.verify(token, "842BD4ED27D41A82770BE39EB5A282CE37DD28A589F37D72D16C43AFF03379A8");
    if (result == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  catch {
    return false;
  }
}

