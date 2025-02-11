const mongoose = require('mongoose')


const password = process.argv[2]

const url = `mongodb+srv://hashhelsinki:${password}@cluster0.smri1.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length ===5) {
    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]}`);
        mongoose.connection.close()
    
    })
}

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => [
            console.log(person)
            
        ])
        mongoose.connection.close()
    })

}