require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())
const cors = require("cors")
const Person = require("./models/person")
const mongoose = require("mongoose")
app.use(cors())
app.use(express.static('dinpmst'))


let persons = []



app.get('/info', (req, res) => {
    res.send(`phoneboook has enteires for ${persons.length} people<br />
        ${Date()}`)
})
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person=>{
        res.json(person)
    }
    )
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.filter(note => note.id !== id)
    res.json(person)
    res.status(204).end()
})
const genId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)

}
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ error: "name missing" });
    }



    if (!body.number) {
        return res.status(400).json({
            error: "number missing"
        })
    }
    const person = new Person({
        id: genId(),
        name: body.name,
        number: body.number
    })
    
    person.save().then(saved => {
        res.json(saved)
    })
})
morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})


