import { Router } from 'express';

import { listPeople, createPerson, updatePerson, dropPerson } from './people';

import { listAdresses, createAdress, updateAdress, dropAdress } from './adresses';

const routes = Router();

routes.get('/people', listPeople);

routes.post('/people', createPerson);

routes.put('/people/:id', updatePerson);

routes.delete('/people/:id', dropPerson);

routes.get('/adresses', listAdresses);

routes.post('/adresses', createAdress);

routes.put('/adresses/:id', updateAdress);

routes.delete('/adresses/:id', dropAdress);

export default routes;