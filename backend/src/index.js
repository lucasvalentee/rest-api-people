const express          = require('express')
     ,cors             = require('cors')
     ,{ uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const people   = []
     ,adresses = [];

app.get('/people', (request, response) => {
    return response.json(people);
});

app.post('/people', (request, response) => {
    const {name, gender, dateBirth, maritalStatus} = request.body,
          person                                   = {id: uuid()
                                                     ,name
                                                     ,gender
                                                     ,dateBirth
                                                     ,maritalStatus};

    people.push(person);

    return response.json(person);
});

app.put('/people/:id', (request, response) => {
    const {id}                                     = request.params,
          {name, gender, dateBirth, maritalStatus} = request.body
          personIndex                              = people.findIndex(person => person.id === id);

    if(personIndex < 0) {
        return response.status(400).json({ error: 'Person not found.' });
    }

    people[personIndex] = { id, name, gender, dateBirth, maritalStatus };

    return response.json(people[personIndex]);
});

app.delete('/people/:id', (request, response) => {
    const {id}        = request.params,
          personIndex = people.findIndex(person => person.id === id);

    if(personIndex < 0) {
        return response.status(400).json({ error: 'Person not found.' });
    }

    people.splice(personIndex, 1);

    return response.status(204).send();
});

app.get('/adresses', (request, response) => {
    const { idPerson } = request.query

    const results = idPerson ? adresses.filter(adress => adress.person_id == idPerson) : adresses;

    return response.json(results);
});

app.post('/adresses', (request, response) => {
    const {person_id, zipCode, adress, number, complement, state, city} = request.body
          ,completeAdress                                               = {id: uuid()
                                                                          ,person_id
                                                                          ,zipCode
                                                                          ,adress
                                                                          ,number
                                                                          ,complement
                                                                          ,state
                                                                          ,city};

    adresses.push(completeAdress);

    return response.json(completeAdress);    
})

app.put('/adresses/:id', (request, response) => {
    const {id}                                                          = request.params,
          {person_id, zipCode, adress, number, complement, state, city} = request.body
          adressIndex                                                   = adresses.findIndex(adress => adress.id === id);

    if(adressIndex < 0) {
        return response.status(400).json({ error: 'Adress not found.' });
    }

    adresses[adressIndex] = { id, person_id, zipCode, adress, number, complement, state, city };

    return response.json(adresses[adressIndex]);
});

app.delete('/adresses/:id', (request, response) => {
    const {id}        = request.params,
          adressIndex = adresses.findIndex(adress => adress.id === id);

    if(adressIndex < 0) {
        return response.status(400).json({ error: 'Adress not found.' });
    }

    adresses.splice(adressIndex, 1);

    return response.status(204).send();
})

app.listen(3333, () => {
    console.log('Back-end started! 🚀')
});