const express = require('express');
const Vonage = require('@vonage/server-sdk');
const OpenTok = require('opentok');


const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();


// Initialize Vonage client
const vonage = new Vonage({
  apiKey: 'fab37377-7554-427b-8794-cf5dcdd2557c',
  apiSecret: '0KrnXvJmIWktKA8j',
});

// Initialize OpenTok
const opentok = new OpenTok('63fb306f','0KrnXvJmIWktKA8j' );
console.log(opentok)

// Generate a Vonage JWT token for a user
app.get('/vonage/token', (req, res) => {
  try {
    const session = vonage.video.createSession();
  } catch (error) {
    console.error('Error generating Vonage JWT token:', error);
    res.status(500).send('Error generating Vonage JWT token');
  }
});


// Create an OpenTok session
app.get('/opentok/session', (req, res) => {
  opentok.createSession((err, session) => {
    if (err) {
      console.error('Error creating OpenTok session:', err);
      res.status(500).send('Error creating OpenTok session');
    } else {
      res.json({ sessionId: session.sessionId });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
