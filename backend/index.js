import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());

//Import and use routes

//Connect to Database
const DB_CONNECTION = 'mongodb+srv://kys_admin:admin123@cluster0.jnj5r.mongodb.net/KYS_DB?retryWrites=true&w=majority';
mongoose.connect(DB_CONNECTION);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to the Database successfully');
})

//Listening to server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

//Backend installs: body-parser cors express mongoose nodemon