const express = require('express');
const app = express();
const port = 3000;


// Serve the frontend files from a directory
app.use(express.static('public'));

// Define API endpoint for turning the motor on
app.get('/motor/on', (req, res) => {
  // Code to turn the motor on
  //console.log('Server received GET request to turn motor on');
  res.send('motor turned on');
});

// Define API endpoint for turning the motor off
app.get('/motor/off', (req, res) => {
  // Code to turn the motor off
  //console.log('Server received GET request to turn motor off');
  res.send('motor turned off');
});

app.get('/motor/control', (req, res) => {
    const number = parseInt(req.query.number);
    //console.log(`Server received GET request to control motor with number: ${number}`);
    // Code to control the motor based on the number
    let status;
    status = number == 0 ? "Idle" : `Running at speed ${number}`;
    res.send(status);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});