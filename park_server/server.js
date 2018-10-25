"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({origin: "http://localhost:3002", credentials: true}));
app.use('../public', express.static(__dirname + "/public"))

// app.get("/session", (req, res) => {
//   console.log('Cookies: ', req.cookies);
//   res.send(req.cookies.name)
// })

app.post("/login", (req, res) => {
  res.cookie('name', req.body.username);
  res.send(req.cookies.name)
})

app.get("/parking_info", (req, res) => {
  // res.cookie('name', 'express'); //Sets name = express

  knex("street_parking").then((data) => {
    let sendData = data.map(coord => ({
      lat_start: coord.lat_start, lng_start: coord.long_start,
      lat_end: coord.lat_end, lng_end: coord.long_end,
      hours: coord.hours, rate: coord.rate,
      id:coord.id
    }))
    res.send(sendData)
  });



  //Testing sending data to db
  // const point = {
  //   latitude: 43.646407,
  //   longitude: -79.396781
  // };
  // knex.insert(point, 'id')
  //   .into('street_parking')
  //   .catch(function(error) {
  //     console.error(error);
  //   }).then(function() {
  //     return knex.select('*')
  //     .from('street_parking')
  //   }).then(function(rows) {
  //     console.log(rows);
  //   })
  //   .catch(function(error) {
  //     console.error(error);
  //   });
});
app.post('/add_rating', (req,res)=>{
  console.log(req.body)
})

app.post('/add_parking_info_data', (req,res)=>{
  console.log(req.body)
  let sendData = {
    hours:"Mon-Sun 6pm-6am",
    id:2018,
    lat_end:43.64865003023193,
    lat_start:43.64861897727979,
    lng_end:-79.37640774013767,
    lng_start:-79.38434707882175,
    rate:2018
  }
  res.send(sendData)
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
