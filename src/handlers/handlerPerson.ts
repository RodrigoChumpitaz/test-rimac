import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from 'uuid';
import AWS from 'aws-sdk'

export const getAllPerson = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    const docClient = new AWS.DynamoDB.DocumentClient();

    const { Items } = await docClient.scan({
        TableName: 'Person',
    }).promise();

    if(Items) {
        response.body = JSON.stringify(Items);
    }

    return response;
}

export const getPersonById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    const docClient = new AWS.DynamoDB.DocumentClient();
    const id = event.pathParameters?.personId;

    
    const { Item } = await docClient.get({
        TableName: 'Person',
        Key:{
            personId: id
        }
    }).promise();
    if(Item) {
        response.body = JSON.stringify(Item);
    }

    return response
}

export const addPerson = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    const docClient = new AWS.DynamoDB.DocumentClient();

    try {
        const requestBody = JSON.parse(event.body as string);
        const personObj = {
            ...requestBody,
            personId: v4()
        }

        const savedPerson = await docClient.put({
            TableName: 'Person',
            Item: personObj
        }).promise();

        if(savedPerson) {
            response.body = JSON.stringify(personObj);
        }
        
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }   
    }
}