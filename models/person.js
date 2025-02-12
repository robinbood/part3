const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGO_URI

console.log('url is :::', url)

mongoose.connect(url).then(result => {
  console.log('connected to::', url)

}).catch(error => {
  console.log('error  connnecting to :', error.message)

})

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength :3,
    required:true
  },
  number :{
    type:String,
    minLength: 8,
    required:true,
    validate : {
      validator : function (v) {
        return /\d{2,3} {2}- \d{5,9}/.test(v)
      },
      message: props => {`${props.value} is not a valiid phone number`}
    }
  }
})

personSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('Person',personSchema)

