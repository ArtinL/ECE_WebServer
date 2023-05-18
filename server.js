var express = require('express');
var app = express();
var port = 3000;

var throttle;
var status; 

app.use(express.static('public'));

app.get('/motor/on', function(req, res) {

  // Code to turn the motor on
  console.log("Server received motor on");
  status = 'Idle';
  res.send(status);
});

app.get('/motor/off', function(req, res) {

  // Code to turn the motor off

  console.log("Server received motor off");
  
  status = 'Off';
  res.send(status);
});

app.get('/motor/control', function (req, res) {

    throttle = req.query.number;

    // Code to control the motor based on the number

    console.log("Server received throttle: " + throttle);
    
    status = throttle == 0 ? "Idle" : "Running at " + (throttle*100).toFixed(0)  + " % throttle";
    res.send(status);
});


// Start the server
app.listen(port, function() {
  console.log("Server running on port" + port);
});