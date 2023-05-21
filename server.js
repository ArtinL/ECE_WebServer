var express = require('express');
var execSync = require('child_process').execSync;


var app = express();
var port = 3000;

var throttle;
var status; 

app.use(express.static('public'));


function writeToFPGA(input) {
  try {
    execSync("./mem_write" + input);
    console.log('C program executed.');
  } catch (error) {
    console.error('Error executing C program:', error);
  }
}

app.get('/motor/on', function(req, res) {

  //writeToFPGA("1111");

  console.log("Server received motor on");
  status = 'Idle';
  res.send(status);
});

app.get('/motor/off', function(req, res) {

  //writeToFPGA("1110");

  console.log("Server received motor off");
  
  status = 'Off';
  res.send(status);
});

app.get('/motor/control', function (req, res) {

    throttle = req.query.number;

    var binary = (throttle*10).toString(2);
    while (binary.length < 4) binary = '0' + binary;
    
    //writeToFPGA(binary);

    console.log("Server received throttle: " + throttle);
    console.log("Binary: " + binary)
    
    status = throttle == 0 ? "Idle" : "Running at " + (throttle*100).toFixed(0)  + " % throttle";
    res.send(status);
});


// Start the server
app.listen(port, function() {
  console.log("Server running on port" + port);
});