import AWS from 'aws-sdk'

export class Database{
    static docClient = new AWS.DynamoDB.DocumentClient();

    static get instance(){
        return Database.docClient;
    }
}