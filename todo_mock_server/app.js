var express = require('express');
var cors = require('cors');
var app = express();
var TasksRoutes = require('./routes/TasksRoutes.js');

app.use(cors());

app.get('/echo/:message', function (req, res) {
  res.send('Ehco: ' + req.query.message)
});

TasksRoutes(app);

app.listen(3000, function () {
  console.log('API listening on port 3000!')
});
