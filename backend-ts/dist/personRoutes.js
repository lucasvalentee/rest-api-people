"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = exports.updateRoute = exports.insertRoute = exports.listRoute = void 0;
var uuidv4_1 = require("uuidv4");
var CreatePerson_1 = require("./services/CreatePerson");
var aPeople = [];
function listRoute(request, response) {
    return response.json(aPeople);
}
exports.listRoute = listRoute;
function insertRoute(request, response) {
    console.log(request);
    console.log(response);
    var _a = request.body, name = _a.name, gender = _a.gender, dateBirth = _a.dateBirth, maritalStatus = _a.maritalStatus, oPerson = CreatePerson_1.CreatePerson({ id: uuidv4_1.uuid(), name: name, gender: gender, dateBirth: dateBirth, maritalStatus: maritalStatus });
    aPeople.push(oPerson);
    return response.json(request);
}
exports.insertRoute = insertRoute;
function updateRoute(request, response) {
    var id = request.params.id, _a = request.body, name = _a.name, gender = _a.gender, dateBirth = _a.dateBirth, maritalStatus = _a.maritalStatus, iPersonIndex = aPeople.findIndex(function (oPerson) { return oPerson.id === id; });
    if (iPersonIndex < 0) {
        return response.status(400).json({ error: 'Person not found.' });
    }
    aPeople[iPersonIndex] = { id: id, name: name, gender: gender, dateBirth: dateBirth, maritalStatus: maritalStatus };
    return response.json(aPeople[iPersonIndex]);
}
exports.updateRoute = updateRoute;
function deleteRoute(request, response) {
    var id = request.params.id, iPersonIndex = aPeople.findIndex(function (oPerson) { return oPerson.id === id; });
    if (iPersonIndex < 0) {
        return response.status(400).json({ error: 'Person not found.' });
    }
    aPeople.splice(iPersonIndex, 1);
    return response.status(204).send();
}
exports.deleteRoute = deleteRoute;
