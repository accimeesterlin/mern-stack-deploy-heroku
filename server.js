
// Importing Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// importing files
const routes = require('./routes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/my_database', {
    useNewUrlParser: true
});

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});