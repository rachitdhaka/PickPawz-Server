require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

const AdopterRouter = require('./Router/Adopter')


app.use(cors());
app.use(express.json());

app.use('/adopter' , AdopterRouter);





const main=async()=>{
    await mongoose.connect(process.env.mongoUrl);
    console.log("DataBase Connected");
    app.listen(3000)
}
main();




