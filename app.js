//IMPORTS
import express from 'express';
import mongoose from 'mongoose';
import {userRoute} from './routes/user.js'
import dotenv from 'dotenv'
dotenv.config(); //initalizes dotenv

// CONNECT 2 DB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then((res)=>{
        console.log('sucessfully connected to DB!');
    }).catch(err=>{
        console.log('error ===>', err);
    });

// INIT EXPRESS TO APP VARIABLE
const app = express();

// MIDDLEWARE
app.use(express.json()); //takes ALL reqs from APIs (bc its middleware) and formats in JSON

//ROUTES
app.get('/',(req, res)=>{ //app.get(path, function (request, response)=>{})
    console.log('im in the terminal!!') //logs into terminal only
    res.send('we are in the browser') //res.send - send to the port
});

app.use('/user', userRoute);  //app.use(path, function)

// LISTEN TO APP AS IT RUNS ON PORT
app.listen(process.env.PORT || 8000); //defining port to 8001 OR 8000