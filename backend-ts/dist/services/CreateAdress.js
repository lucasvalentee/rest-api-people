"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdress = void 0;
function CreateAdress(_a) {
    var id = _a.id, person_id = _a.person_id, zipCode = _a.zipCode, adress = _a.adress, number = _a.number, complement = _a.complement, state = _a.state, city = _a.city;
    var oAdress = { id: id, person_id: person_id, zipCode: zipCode, adress: adress, number: number, complement: complement, state: state, city: city };
    return oAdress;
}
exports.CreateAdress = CreateAdress;
