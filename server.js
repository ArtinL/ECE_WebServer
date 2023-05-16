const express = require('express');
const app = express();
const port = 3000;

let throttle; 
// Serve the frontend files from a directory
app.use(express.static('public'));

// Define API endpoint for turning the motor on
app.get('/motor/on', (req, res) => {
  // Code to turn the motor on
  //console.log('Server received GET request to turn motor on');
  res.send('Idle');
});

// Define API endpoint for turning the motor off
app.get('/motor/off', (req, res) => {
  // Code to turn the motor off
  //console.log('Server received GET request to turn motor off');
  res.send('Off');
});

app.get('/motor/control', (req, res) => {
    throttle = parseFloat(req.query.number).toFixed(1);
    //console.log(`Server received GET request to control motor with number: ${number}`);
    // Code to control the motor based on the number
    let status;
    status = throttle == 0 ? "Idle" : `Running at ${throttle*100}% throttle`;
    res.send(status);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});