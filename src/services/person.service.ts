import { IPerson, IPersonInsert } from "../modules/Person/Schema/person.schema";
import { PersonRepository } from "../modules/Person/person.repository";

export class PersonService{
    private repository: PersonRepository;

    constructor(repository: PersonRepository){
        this.repository = repository;
    }

    async getAllPerson(): Promise<IPerson[]>{
        return await this.repository.getAllPerson();
    }

    async getPersonById(id: string): Promise<IPerson>{
        return await this.repository.getPersonById(id);
    }

    async addPerson(person: IPersonInsert){
        return await this.repository.addPerson(person);
    }
}