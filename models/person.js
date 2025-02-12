const mongoose = require('mongoose')

mongoose.set("strictQuery",false)

const url = process.env.MONGO_URI

console.log("url is :::", url)

mongoose.connect(url).then(result => {
    console.log("connected to::", url);
    
}).catch(error => {
    console.log("error  connnecting to :", error.message);
    
})

const personSchema = new mongoose.Schema({
    name:String,
    number :String
})

personSchema.set("toJSON",{
    transform:(document,returnedObject) =>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('Person',personSchema)

