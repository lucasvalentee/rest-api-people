import { Request     , Response }   from 'express';
import { uuid        , isUuid }     from 'uuidv4';
import { CreateAdress, AdressData } from './services/CreateAdress';

const aAdresses:Array<AdressData> = [];

export function listAdresses(request: Request, response: Response) {
    const { idPerson } = request.query;

    return response.json((idPerson ? aAdresses.filter(oAdress => oAdress.person_id == idPerson) : aAdresses));
}

export function createAdress(request: Request, response: Response) {
    const {person_id, zipCode, adress, number, complement, state, city} = request.body
          ,oAdress                                                      = CreateAdress({id: uuid()
                                                                                       ,person_id
                                                                                       ,zipCode
                                                                                       ,adress
                                                                                       ,number
                                                                                       ,complement
                                                                                       ,state
                                                                                       ,city});

    aAdresses.push(oAdress);

    return response.json(oAdress);   
}

export function updateAdress(request: Request, response: Response) {
    const {person_id, zipCode, adress, number, complement, state, city} = request.body
         ,{id}                                                          = request.params
         ,iAdressIndex                                                  = aAdresses.findIndex(oAdress => oAdress.id === id);

    if(iAdressIndex >= 0) {
        aAdresses[iAdressIndex] = { id, person_id, zipCode, adress, number, complement, state, city };
    
        return response.json(aAdresses[iAdressIndex]);
    }
    else {
        return response.status(400).json({ error: 'Adress not found.' });
    }
}

export function dropAdress(request: Request, response: Response) {
    const {id}         = request.params,
          iAdressIndex = aAdresses.findIndex(oAdress => oAdress.id === id);

    if(iAdressIndex >= 0) {
        aAdresses.splice(iAdressIndex, 1);
    
        return response.status(204).send();
    }
    else {
        return response.status(400).json({ error: 'Adress not found.' });
    }    
}

export function dropAdressByPerson(iPersonId: string) {
    let aPersonAdress = aAdresses.filter(oAdress => oAdress.person_id === iPersonId);

    aPersonAdress.forEach(function(oPersonAdress, iIndex) {
        aAdresses.splice(aAdresses.findIndex(oAdress => oAdress.id === oPersonAdress.id), 1);
    });
}