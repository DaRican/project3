const express = require('express');
var cors = require('cors');
const path = require('path');
// helps connect to mongo data base
const mongoose = require('mongoose');
const routes = require("./routes");

// environment variables in the env file
require('dotenv').config();
// body parser is no longer needed in the new version of express
// const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// our middle ware cors and express allows us to parse json we are sending and receiving json
app.use(cors());
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "public", "index.html"))
    })
}

// Add routes, both API and view
app.use(routes);


// Set localhost and process.env.MONGODB_URI (heroku)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/joblistings",
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


// need to make the files in the routes folder first then require them and then use the files
const educationRouter = require('./routes/api/education');
const profileRouter = require('./routes/api/profile');
const skillsRouter = require('./routes/api/skills');

// using the files router is directing the user to the search for file 
app.use('/education', educationRouter);
app.use('/profile', profileRouter);
app.use('/skills', skillsRouter);

// this actually starts the server listens on port
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});

// start this particular server with nodemon server, make sure you are in the correct directory 
