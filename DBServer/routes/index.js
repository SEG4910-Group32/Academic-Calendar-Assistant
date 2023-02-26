const { json } = require('express');
var express = require('express');
var router = express.Router();
// import db from "../db/conn.js"

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://calendarAssistant:Password1@calendarassistant.n45huxo.mongodb.net/caDB?retryWrites=true&w=majority");
const db = mongoose.connection

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
/* GET Schedule. */
// ---------------------------------
router.get('/schedule/', async function (req, res, next) {

  let results = await db.collection("Schedules").find({}).toArray();

  res.send(results).status(200);
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
/* GET Users. */
// ---------------------------------
router.get('/user/', async function (req, res, next) {

  let results = await db.collection("Users").find({}).toArray();

  res.send(results).status(200);
});

// ---------------------------------
/* Create Schedule. */
// ---------------------------------
router.post('/user/create', async function (req, res, next) {

  let results = await db.collection("Users").insertOne(req.body);

  res.send(results).status(204);
});

// ---------------------------------
/* Update Schedule. */
// ---------------------------------
router.patch("/user/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  delete req.body._id;
  let collection = await db.collection("Users");
  console.log(query)
  console.log(req.body)
  let result = await collection.updateOne(query, { $set: req.body }, { upsert: true })

  res.send(result).status(200);
});

// ---------------------------------
/* Delete Schedule. */
// ---------------------------------
router.delete("/user/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  console.log(query);
  const collection = db.collection("Users");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
