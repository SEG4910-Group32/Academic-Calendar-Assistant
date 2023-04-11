const { json } = require('express');
var express = require('express');
var router = express.Router();
// import db from "../db/conn.js"
require("../db/user.model")

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://calendarAssistant:Password1@calendarassistant.n45huxo.mongodb.net/caDB?retryWrites=true&w=majority");
const db = mongoose.connection
const bcrypt = require('bcrypt');

// ---------------------------------
/* GET Events. */
// ---------------------------------
router.get('/event/', async function (req, res, next) {

  let results = await db.collection("Events").find({}).toArray();

  res.send(results).status(200);
});

// ---------------------------------
/* Create Event. */
// ---------------------------------
router.post('/event/create', async function (req, res, next) {

  let results = await db.collection("Events").insertOne(req.body);

  res.send(results).status(204);
});

// ---------------------------------
/* Update Event. */
// ---------------------------------
router.patch("/event/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  delete req.body._id;
  let collection = await db.collection("Events");
  console.log(query)
  console.log(req.body)
  let result = await collection.updateOne(query, { $set: req.body }, { upsert: true })

  res.send(result).status(200);
});

// ---------------------------------
/* Delete Event. */
// ---------------------------------
router.delete("/event/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  console.log(query);
  const collection = db.collection("Events");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// ---------------------------------
// get all schedules
// ---------------------------------
router.get('/schedule', async (req, res) => {
  let schedules = await db.collection("Schedules").find({}).toArray();

  res.send(schedules).status(200);
});

// ---------------------------------
// get schedule by id
// ---------------------------------
router.get('/schedule/:id', async (req, res) => {
  let collection = await db.collection("Schedules");

  await collection.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, doc) => {
    if (err) throw err;

    res.send(doc).status(200);
  });
});

// ---------------------------------
// check if schedule with id exists
// ---------------------------------
router.get('/schedule/check/:id', async (req, res) => {
  let collection = await db.collection("Schedules");

  await collection.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, doc) => {
    if (err) throw err;

    if (doc) {
      res.send(true);
    }
    else {
      res.send(false);
    }
    
  });
});

// ---------------------------------
/* Create Schedule. */
// ---------------------------------
router.post('/schedule/create', async function (req, res, next) {
  let results = await db.collection("Schedules").insertOne(req.body);

  res.send(results).status(204);
});


// ---------------------------------
/* Update Schedule. */
// ---------------------------------
router.patch("/schedule/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  delete req.body._id;
  let collection = await db.collection("Schedules");
  console.log(query)
  console.log(req.body)
  let result = await collection.updateOne(query, { $set: req.body }, { upsert: true })

  res.send(result).status(200);
});

// ---------------------------------
/* Delete Schedule. */
// ---------------------------------
router.delete("/schedule/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  console.log(query);
  const collection = db.collection("Schedules");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});
// ---------------------------------
/* Check if ID exists in the database*/
// ---------------------------------

router.get('/schedule/check/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Checking for ID:', id); // Log the ID being checked
    
    const result = await db.collection('Schedules').findOne({ id });
    console.log('Result:', result); // Log the result of the query

    res.send(!!result);
  } catch (error) {
    console.error('Error:', error); // Log the error if any
    res.status(500).send('An error occurred while checking the ID.');
  }
});




const User = mongoose.model("User");

// ---------------------------------
/* GET Users. */
// ---------------------------------
router.get('/user', async (req, res) => {
  let users = await db.collection("users").find({}).toArray();

  res.send(users).status(200);
});

// ---------------------------------
/* Create User. */
// ---------------------------------
router.post('/user/create', async function (req, res, next) {

  //let results = await db.collection("Users").insertOne(req.body);
  console.log("test");
  let user = new User();
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err)
        res.send(doc);
    else {
        if (err.code == 11000)
            res.status(422).send(['Duplicate email address found.']);
        else
            return next(err);
    }

  });


 // res.send(results).status(204);
});

// ---------------------------------------
// get user by email and check password
// ---------------------------------------
router.post('/user/login', async (req, res) => {
  let collection = await db.collection("users");
  
  await collection.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) throw err;

      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      console.log(isMatch);

      if (isMatch) {
        res.send(userInfo).status(200);
      }
    });
  });
  
});

// ----------------------------------------
// update user                           
//-----------------------------------------
router.patch("/user/update", async (req, res) => {
  let collection = await db.collection("users");

  await collection.updateOne({ email: req.body.email }, { $set: { firstName: req.body.firstName, lastName: req.body.lastName } })
                              .then(status => { res.send(status); });
});

// ----------------------------------------
// update user password                       
//-----------------------------------------
router.patch("/user/update/pass", async (req, res) => {
  let collection = await db.collection("users");

  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      collection.updateOne({ email: req.body.email }, { $set: { password: hash, saltSecret: salt } })
                              .then(status => { res.send(status); });
    });
  });

});

// ----------------------------------------
// delete user                          
//-----------------------------------------
// req body not supported for some reason
router.delete("/user/delete/:email", async (req, res) => {
  let collection = await db.collection("users");

  await collection.findOne({ email: req.params.email }).then(doc => {
    if (doc) {
      collection.deleteOne({ _id: doc._id }).then(status => {
        res.send(status);
      });
    }
    else {
      res.send("user not found");
    }
  });

});

// ----------------------------------------
// Check if email passed in params corresponds to a User in the Database                          
//-----------------------------------------
router.get("/user/check/email/:email", async (req, res) => {
  let collection = await db.collection("users");

  await collection.findOne({ email: req.params.email }).then(doc => {
    if (doc) {
      res.send(true);
    }
    else {
      res.send(false);
    }
  });
});

module.exports = router;