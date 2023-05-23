var express = require('express');
var execSync = require('child_process').execSync;


var app = express();
var port = 3000;

var throttle;
var status; 

app.use(express.static('public'));


function writeToFPGA(input) {
  try {
    var out = execSync("./mem_write " + input).toString();
    console.log('C program executed.');
    console.log(out);
  } catch (error) {
    console.error('Error executing C program:', error);
  }
}

app.get('/motor/on', function(req, res) {

  console.log("Server received motor on");

  writeToFPGA("1111");

  status = 'Idle';
  res.send(status);
  console.log("\n\n");
});

app.get('/motor/off', function(req, res) {

  console.log("Server received motor off");
  
  writeToFPGA("1110");

  status = 'Off';
  res.send(status);
  console.log("\n\n");
});

app.get('/motor/control', function (req, res) {

    throttle = req.query.number;

    var binary = (throttle*10).toString(2);
    while (binary.length < 4) binary = '0' + binary;

    console.log("Server received throttle: " + throttle);
    console.log("Binary: " + binary)
    
    writeToFPGA(binary);

    
    status = throttle == 0 ? "Idle" : "Running at " + (throttle*100).toFixed(0)  + "% throttle";
    res.send(status);
    console.log("\n\n");
});


// Start the server
app.listen(port, function() {
  console.log("Server running on port" + port);
});