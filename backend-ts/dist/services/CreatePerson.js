"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePerson = void 0;
function CreatePerson(_a) {
    var id = _a.id, name = _a.name, gender = _a.gender, dateBirth = _a.dateBirth, maritalStatus = _a.maritalStatus;
    var oPerson = { id: id, name: name, gender: gender, dateBirth: dateBirth, maritalStatus: maritalStatus };
    return oPerson;
}
exports.CreatePerson = CreatePerson;
