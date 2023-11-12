/**Authorization Routes
 * Login, JWT generation and other auth related operations
 */

/**Boilerplate Jwt Auth Ops
 * 
    var token;
    try {
      token = req.headers.authorization.split(' ')[1];
    }
    catch {
      return res.status(401).send("Auth problem")
    }
    if (token && verifyToken(token)) {
      //Authorized user operations here
    }
    else {
      return res.status(401).send("Auth problem");
    }
 */

//Begin required controller dependences/declarations
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const jwt = require("jsonwebtoken");
//End required controller dependencies/declarations

require("../Models/UserModel");
const User = mongoose.model('User');

//debug -- not production code
router.post("/", (req, res) =>
{
  return res.send("Dogget")
});

router.get("/ApiVersion", (req, res) =>
{
  return res.send("1.0.1.0");
});
router.get("/Info", (req, res) =>
{
  return res.send("Developed by KYGM for CMSC2204");
});

router.post("/login", async (req, res) =>
{
  let { username, password } = req.body;

  let existingUser;
  try
  {
    existingUser = await User.findOne({ Username: username });
  }
  catch (err)
  {
    return res.status(400).send(err);
  }
  if (!existingUser || existingUser.Password != password)
  {
    return res.status(401).send("Verify credentials");
  }
  let token;
  try
  {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.Username },
      "842BD4ED27D41A82770BE39EB5A282CE37DD28A589F37D72D16C43AFF03379A8",
      { expiresIn: "1h" }
    );
  } catch (err)
  {
    return res.status(400).send(err);
  }

  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
    });
});

router.post("/AddUser", async (req, res) =>
{
  var token;
  try
  {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token))
  {
    try
    {
      let user = {
        Username: req.body?.username,
        Password: req.body?.password,
        Email: req.body?.email,
        AuthLevel: req.body?.authLevel
      };
      await User(user).save().then(() =>
      {
        return res.status(201).send("User created")
      });
    }
    catch (error)
    {
      return res.status(500).send("An error occurred: " + error);
    }
  }
  else
  {
    return res.status(401).send("Auth problem");
  }
});

router.get("/GetUsers", async (req, res) =>
{
  var token;
  try
  {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token))
  {
    try
    {
      await User.find({}).then(users =>
      {
        return res.status(200).json(users);
      }, (res) =>
      {
        console.log("rejected?" + res)
      });
    }
    catch (error)
    {
      //console.log("Hit catch block with error: " + error)
      return res.status(500).send(`There was an error: ${error}`);
    }
  }
  else
  {
    return res.status(401).send("Auth problem");
  }
});

router.get("/GetUserById", async (req, res) =>
{
  var token;
  try
  {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token))
  {
    try
    {
      user = await User.findOne({ _id: req.query?.id });
      if (user != null)
      {
        return res.status(200).send(user);
      }
      else
      {
        return res.status(400).send("No user found")
      }
    }
    catch (error)
    {
      //console.log("Hit catch block with error: " + error)
      return res.status(500).send(`There was an error: ${error}`);
    }
  }
  else
  {
    return res.status(401).send("Auth problem");
  }
});

//Delete
router.post("/DeleteUserById", async (req, res) =>
{
  var token;
  try
  {
    token = req.headers.authorization.split(' ')[1];
  }
  catch {
    return res.status(401).send("Auth problem")
  }
  if (token && verifyToken(token))
  {
    try
    {
      let user;
      try
      {
        user = await User.findOne({ _id: req.body?.id });
      }
      catch {
        throw new Error("User lookup error");
      }
      if (user)
      {
        let result = await User.deleteOne({ _id: req.body.id });
        if (result)
        {
          return res.status(200).send(`${req.body.id} deleted`);
        }
        else
        {
          return res.status(400).send(`Failed to delete user ${req.body.id}`);
        }
      }
      else
      {
        return res.status(400).send("No user found");
      }
    }
    catch (error)
    {
      return res.status(500).send(`There was an error: ${error}`);
    }

  }
  else
  {
    return res.status(401).send("Auth problem");
  }
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

module.exports = router;