import { IPerson, IPersonInsert } from "./Schema/person.schema";

export interface PersonRepository {
    getPersonById(id: string): Promise<IPerson>;
    getAllPerson(): Promise<IPerson[]>;
    addPerson(person: IPersonInsert): Promise<boolean>;
}