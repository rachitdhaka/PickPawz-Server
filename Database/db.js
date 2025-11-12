const mongoose = require('mongoose')
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
require('dotenv').config();
mongoose.connect(process.env.mongoUrl);


const AdopterSchema = new Schema({
    email: {
        type : String ,
        required : true ,
        unique: true
    },
    password: {
        type : String ,
        required : true ,
    },
    firstname: {
        type : String ,
        required : true ,
    },
    lastname: {
        type : String ,
        required : true ,
    },
    Profession: {
        type : String
    },
    Description: {
        type : String
    },
    Phone: {
        type : String
    },
    Email: {
        type : String
    },
    HouseFamily: {
        type : String
    },
    ReasonToAdopt: {
        type : String
    },
    city: {
        type : String
    },
    state: {
        type : String
    }
})

const AdopterModel = mongoose.model("adopter" , AdopterSchema)
module.exports= AdopterModel
