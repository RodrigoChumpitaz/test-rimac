import { IPersonInsert } from './Schema/person.schema';
import { PersonInfraestructure } from './person.infraestructure';
import { PersonService } from '../../services/person.service';


const personInfraestructure = new PersonInfraestructure();
const personService = new PersonService(personInfraestructure);

test("PERSON: CONTROLLER: CREATE", async () => {
  const person: IPersonInsert = {
    name: "John Doe",
    lastName: "Doe",
    age: "20",
  };
  const personInserted = await personService.addPerson(person);
  expect(personInserted).not.toBe(false);
});