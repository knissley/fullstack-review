const express = require('express');
let app = express();
const gitHub = require('../helpers/github.js');
const {retrieve} = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res, next) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const username = req.body.username;
  gitHub.getReposByUsername(username, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(201);
    }
  })
});

app.get('/repos', function (req, res, next) {
  // This route should send back the top 25 repos
  retrieve( (results) => {
    res.send(results);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

