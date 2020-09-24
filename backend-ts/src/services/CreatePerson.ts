export interface PersonData {
    id: string;
    name: string;
    gender: number;
    dateBirth: string;
    maritalStatus: number;
}

export function CreatePerson({ id, name, gender, dateBirth, maritalStatus }: PersonData) {
    const oPerson = { id, name, gender, dateBirth, maritalStatus };
    return oPerson;
}