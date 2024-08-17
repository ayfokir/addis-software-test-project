require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Ensure the path is correct
const sanitize = require( 'sanitize' )
const app = express();


app.use(cors());
app.use(express.json());
app.use( sanitize.middleware );

app.use(routes); // Use the routes

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server Running at http://localhost:${port}`);
});
