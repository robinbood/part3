require('dotenv').config()
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
const Person = require('./models/person')
app.get('/api/persons' ,(req,res) => {
    Person.find({}).then(persons=>{
        res.json(persons)
    })
})
app.get('/api/persons/:id', (req, res,next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        }else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})
app.put("/api/persons/:id" ,(req,res,next) => {
    const body = req .body

    const person = {
        name :body.name,
        number : body.number
    }

    Person.findByIdAndUpdate(req.params.id,person.number,{new:true})
    .then(updatedPhone => {
        res.json(updatedPhone)
    })
    .catch(error => next(error))
})


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
    const person = new Person ({
        name : body.name,
        number: body.number
    })
    person.save().then(saved =>{
        res.json(saved)
    })
})
const errorHandler = (error,req, res , next) => {
    console.error(error.message);
    
    if (error.name === "CastError") {
        return res.status(400).send({error :"malformatted id"})
    }
    next(error)
}

app.use(errorHandler)
morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})


