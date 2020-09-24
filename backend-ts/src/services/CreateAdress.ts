export interface AdressData {
    id: string;
    person_id: string;
    zipCode: string;
    adress: string;
    number: number;
    complement: string;
    state: string;
    city: string;
}

export function CreateAdress({ id, person_id, zipCode, adress, number, complement, state, city }: AdressData) {
    const oAdress = { id, person_id, zipCode, adress, number, complement, state, city };
    return oAdress;
}