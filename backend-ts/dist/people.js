"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropPerson = exports.updatePerson = exports.createPerson = exports.listPeople = void 0;
var uuidv4_1 = require("uuidv4");
var CreatePerson_1 = require("./services/CreatePerson");
var adresses_1 = require("./adresses");
var aPeople = [];
function listPeople(request, response) {
    return response.json(aPeople);
}
exports.listPeople = listPeople;
function createPerson(request, response) {
    var _a = request.body, name = _a.name, gender = _a.gender, dateBirth = _a.dateBirth, maritalStatus = _a.maritalStatus, oPerson = CreatePerson_1.CreatePerson({ id: uuidv4_1.uuid(), name: name, gender: gender, dateBirth: dateBirth, maritalStatus: maritalStatus });
    aPeople.push(oPerson);
    return response.json(oPerson);
}
exports.createPerson = createPerson;
function updatePerson(request, response) {
    var _a = request.body, name = _a.name, gender = _a.gender, dateBirth = _a.dateBirth, maritalStatus = _a.maritalStatus, id = request.params.id, iPersonIndex = aPeople.findIndex(function (oPerson) { return oPerson.id === id; });
    if (iPersonIndex >= 0) {
        aPeople[iPersonIndex] = { id: id, name: name, gender: gender, dateBirth: dateBirth, maritalStatus: maritalStatus };
        return response.json(aPeople[iPersonIndex]);
    }
    else {
        return response.status(400).json({ error: 'Person not found.' });
    }
}
exports.updatePerson = updatePerson;
function dropPerson(request, response) {
    var id = request.params.id, iPersonIndex = aPeople.findIndex(function (oPerson) { return oPerson.id === id; });
    if (iPersonIndex >= 0) {
        adresses_1.dropAdressByPerson(id);
        aPeople.splice(iPersonIndex, 1);
        return response.status(204).send();
    }
    else {
        return response.status(400).json({ error: 'Person not found.' });
    }
}
exports.dropPerson = dropPerson;
