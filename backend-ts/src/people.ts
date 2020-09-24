import { Request     , Response }   from 'express';
import { uuid        , isUuid }     from 'uuidv4';
import { CreatePerson, PersonData } from './services/CreatePerson';
import { dropAdressByPerson }       from './adresses';

const aPeople:Array<PersonData> = [];

export function listPeople(request: Request, response: Response) {
    return response.json(aPeople);
}

export function createPerson(request: Request, response: Response) {
    let {name
        ,gender
        ,dateBirth
        ,maritalStatus} = request.body
        ,oPerson        = CreatePerson({ id: uuid(), name, gender, dateBirth, maritalStatus });

    aPeople.push(oPerson);

    return response.json(oPerson);
}

export function updatePerson(request: Request, response: Response) {
    let {name 
       ,gender
       ,dateBirth
       ,maritalStatus} = request.body
       ,{id}           = request.params
       ,iPersonIndex   = aPeople.findIndex(oPerson => oPerson.id === id);

    if(iPersonIndex >= 0) {
        aPeople[iPersonIndex] = { id, name, gender, dateBirth, maritalStatus };
    
        return response.json(aPeople[iPersonIndex]);
    }
    else {
        return response.status(400).json({ error: 'Person not found.' });
    }
}

export function dropPerson(request: Request, response: Response) {
    let {id}         = request.params
       ,iPersonIndex = aPeople.findIndex(oPerson => oPerson.id === id);

    if(iPersonIndex >= 0) {
        dropAdressByPerson(id);

        aPeople.splice(iPersonIndex, 1);
    
        return response.status(204).send();
    }
    else {
        return response.status(400).json({ error: 'Person not found.' });
    }
}
