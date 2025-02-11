require('dotenv').config
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const url=process.env.MONGO_URI



console.log("connectinng to :", url)
mongoose.connect(url)
    .then(result => {
        console.log("connected to mongoDB");

    })
    .catch(error => {
        console.log("error connecting to mongoDB", error.nessage)
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports= mongoose.model('Person' ,personSchema)