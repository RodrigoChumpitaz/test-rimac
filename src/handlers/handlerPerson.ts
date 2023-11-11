import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from 'aws-sdk'
import { PersonInfraestructure } from '../modules/Person/person.infraestructure';
import { PersonService } from "../services/person.service";
import { IPersonInsert } from "../modules/Person/Schema/person.schema";
import { fromError } from "../common/helpers/ErrorResponseHelper";

const personInfraestructure = new PersonInfraestructure();
const personService = new PersonService(personInfraestructure);

export const getAllPerson = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify([])
    }

    const personList = await personService.getAllPerson();

    if(personList) {
        response.body = JSON.stringify(personList);
    }

    return response;
}

export const getPersonById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    try {
        const personId = event.pathParameters?.personId || '';

        const person = await personService.getPersonById(personId);

        if(person) response.body = JSON.stringify(person);
    } catch (error) {
        response = fromError(error);
    }

    return response
}

export const addPerson = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    try {
        const requesBody = JSON.parse(event.body as string);

        const person: IPersonInsert = { ...requesBody };
        const savedPerson = await personService.addPerson(person);

        if(savedPerson) response.body = JSON.stringify(person);
    } catch (error) {
        response = fromError(error);
    }
    return response
}