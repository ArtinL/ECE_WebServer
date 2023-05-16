const express = require('express');
const app = express();
const port = 3000;

let throttle;
let status; 

app.use(express.static('public'));

app.get('/motor/on', (req, res) => {

  // Code to turn the motor on
  
  status = 'Idle';
  res.send(status);
});

app.get('/motor/off', (req, res) => {

  // Code to turn the motor off
  
  status = 'Off';
  res.send(status);
});

app.get('/motor/control', (req, res) => {

    throttle = req.query.number;

    // Code to control the motor based on the number
    
    status = throttle == 0 ? "Idle" : `Running at ${(throttle*100).toFixed(0)}% throttle`;
    res.send(status);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});