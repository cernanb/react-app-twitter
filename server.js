import fs from 'fs';
import express from 'express';
var dotenv = require('dotenv');
dotenv.load();

let app = express();

app.listen(5000, () => {
  console.log("Listening on port 5000");
})

app.use(express.static('public'));
