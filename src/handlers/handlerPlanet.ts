import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { tranlater } from "../common/helpers/translater.helper";
import { PlanetMap } from "../common/types/PlanetMap";
import { planetTranslation } from "../i18n/planet.spa";
import { IPlanet } from "../modules/Planet/Schema/planet.schema";
import { PlanetInfraestructure } from '../modules/Planet/planet.infraestructure';
import { PlanetService } from "../services/planet.service";
import { fromError } from "../common/helpers/ErrorResponseHelper";

const planetInfraestructure = new PlanetInfraestructure();
const planetService = new PlanetService(planetInfraestructure);

export const getPlanetById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    try {
        const id = event.pathParameters?.planetId || '';
        const lang = event.queryStringParameters?.lang || 'spa';

        if (id === '' || id === undefined) {
            response.statusCode = 400;
            response.body = JSON.stringify({
            error: 'Parameter id is needed please use ?id= at request URL',
            });
            return response;
        }

        const planet: IPlanet = await planetService.getPlanetById(id);
        
        if(!lang || lang === 'spa') {
            const tranlatePlanet = tranlater<PlanetMap>(planet, planetTranslation);
            response.body = JSON.stringify(tranlatePlanet);
        }

        if(lang === 'eng') {
            response.body = JSON.stringify(planet);
        }
    } catch (error) {
        response = fromError(error);
    }

    return response;
}