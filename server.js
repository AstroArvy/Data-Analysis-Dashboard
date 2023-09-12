const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = 3000; // Replace with your desired port

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aryan@1998',
  database: 'microtek',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Use the CORS middleware to enable CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

//use another url to serve the mapdata json
// Serve the JSON file as a separate API endpoint
app.use('/api/mapdata', express.static("in_all_topo.json"));


// Define an API endpoint to fetch data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM service'; // Replace with your table name

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error: ' + err.stack);
      res.status(500).json({ error: 'Database query error' });
      return;
    }

    res.json(results); // Send the data as JSON response
  });
});

// Custom middleware for handling OPTIONS requests
app.options('/api/data', (req, res) => {
  res.sendStatus(200); // Respond with a 200 OK for OPTIONS requests
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
