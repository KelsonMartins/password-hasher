import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const port = process.env.PORT || 5000;
const app = express();

require('./user.routes')(app);

// Defining middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect('mongodb://localhost:27017/hasher', {
    // useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(port, () => {
    console.log('App is Running on port', port)
});