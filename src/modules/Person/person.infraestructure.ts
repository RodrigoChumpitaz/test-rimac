import { Database } from "../../server/database";
import { IPerson, IPersonInsert } from "./Schema/person.schema";
import { PersonRepository } from "./person.repository";
import { v4 } from 'uuid';

export class PersonInfraestructure implements PersonRepository{
    private readonly tableName: string = 'Person';

    async getAllPerson(): Promise<IPerson[]> {
        const db = Database.instance;

        const { Items } = await db.scan({
            TableName: this.tableName,
        }).promise();

        return Items as IPerson[];
    }

    async getPersonById(id: string): Promise<IPerson> {
        const db = Database.instance;

        const { Item } = await db.get({
            TableName: this.tableName,
            Key:{
                personId: id
            }
        }).promise();

        return Item as IPerson;
    }

    async addPerson(person: IPersonInsert): Promise<boolean> {
        const db = Database.instance;

        const storablePerson: IPerson = {
            personId: v4(),
            ...person
        }

        const savedPerson = await db.put({
            TableName: this.tableName,
            Item: storablePerson
        }).promise();

        if(savedPerson) {
            return true
        }
        
        return false;
    }
}