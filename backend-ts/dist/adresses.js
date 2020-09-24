"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropAdressByPerson = exports.dropAdress = exports.updateAdress = exports.createAdress = exports.listAdresses = void 0;
var uuidv4_1 = require("uuidv4");
var CreateAdress_1 = require("./services/CreateAdress");
var aAdresses = [];
function listAdresses(request, response) {
    var idPerson = request.query.idPerson;
    return response.json((idPerson ? aAdresses.filter(function (oAdress) { return oAdress.person_id == idPerson; }) : aAdresses));
}
exports.listAdresses = listAdresses;
function createAdress(request, response) {
    var _a = request.body, person_id = _a.person_id, zipCode = _a.zipCode, adress = _a.adress, number = _a.number, complement = _a.complement, state = _a.state, city = _a.city, oAdress = CreateAdress_1.CreateAdress({ id: uuidv4_1.uuid(), person_id: person_id,
        zipCode: zipCode,
        adress: adress,
        number: number,
        complement: complement,
        state: state,
        city: city });
    aAdresses.push(oAdress);
    return response.json(oAdress);
}
exports.createAdress = createAdress;
function updateAdress(request, response) {
    var _a = request.body, person_id = _a.person_id, zipCode = _a.zipCode, adress = _a.adress, number = _a.number, complement = _a.complement, state = _a.state, city = _a.city, id = request.params.id, iAdressIndex = aAdresses.findIndex(function (oAdress) { return oAdress.id === id; });
    if (iAdressIndex >= 0) {
        aAdresses[iAdressIndex] = { id: id, person_id: person_id, zipCode: zipCode, adress: adress, number: number, complement: complement, state: state, city: city };
        return response.json(aAdresses[iAdressIndex]);
    }
    else {
        return response.status(400).json({ error: 'Adress not found.' });
    }
}
exports.updateAdress = updateAdress;
function dropAdress(request, response) {
    var id = request.params.id, iAdressIndex = aAdresses.findIndex(function (oAdress) { return oAdress.id === id; });
    if (iAdressIndex >= 0) {
        aAdresses.splice(iAdressIndex, 1);
        return response.status(204).send();
    }
    else {
        return response.status(400).json({ error: 'Adress not found.' });
    }
}
exports.dropAdress = dropAdress;
function dropAdressByPerson(iPersonId) {
    var aPersonAdress = aAdresses.filter(function (oAdress) { return oAdress.person_id === iPersonId; });
    aPersonAdress.forEach(function (oPersonAdress, iIndex) {
        aAdresses.splice(aAdresses.findIndex(function (oAdress) { return oAdress.id === oPersonAdress.id; }), 1);
    });
}
exports.dropAdressByPerson = dropAdressByPerson;
