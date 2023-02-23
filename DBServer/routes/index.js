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
router.get('/', async function(req, res, next) {

  let results = await db.collection("Events").find({}).toArray();
  
  res.send(results).status(200);
});

// ---------------------------------
/* Create Event. */
// ---------------------------------
router.post('/create', async function(req, res, next) {

  let results = await db.collection("Events").insertOne(req.body);
  
  res.send(results).status(204);
});

// ---------------------------------
/* Update Event. */
// ---------------------------------
router.patch("/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  // const updates = {
  //   $push: { comments: req.body }
  // };
  // newEvent = JSON.parse(req.body);
  delete req.body._id;
  eventToUpdate = {summary: req.body.summary, description:req.body.description, location: req.body.location, start_date: req.body.start_date, end_date: req.body.end_date};
  let collection = await db.collection("Events");
  // let result = await collection.updateOne(query, updates);
  console.log(query)
  console.log(req.body)
  let result = await collection.updateOne(query, {$set:  req.body}, {upsert:true})

  res.send(result).status(200);
});

// ---------------------------------
/* Delete Event. */
// ---------------------------------
router.delete("/:id", async (req, res) => {
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  console.log(query);
  const collection = db.collection("Events");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;
