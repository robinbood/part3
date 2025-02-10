const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
app.use(express.static('dist'))


let persons = [

    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }

]



app.get('/info', (req, res) => {
    res.send(`phoneboook has enteires for ${persons.length} people<br />
        ${Date()}`)
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404)
        res.send("<h1>It does not exist<h1/>")
    }
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
    const person = {
        id: genId(),
        name: body.name,
        number: body.number
    }
    const exists = persons.find(n => n.name === body.name)
    if (exists) {
        return res.status(204).json({ error: "it already exists" })
    }
    person = persons.concat(person)
    res.json(person)
})
morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})


