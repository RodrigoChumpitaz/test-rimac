import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { tranlater } from "../helpers/translater.helper";
import { PlanetMap } from "../types/PlanetMap";
import { planetTranslation } from "../i18n/planet.spa";
import axios from "axios";

export interface IPlanet {
    name:            string;
    rotation_period: string;
    orbital_period:  string;
    diameter:        string;
    climate:         string;
    gravity:         string;
    terrain:         string;
    surface_water:   string;
    population:      string;
    residents:       string[];
    films:           string[];
    created:         Date;
    edited:          Date;
    url:             string;
}


export const getPlanetById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({})
    }
    const id = event.pathParameters?.planetId;

    if (id === undefined) {
        response.statusCode = 400;
        response.body = JSON.stringify({
          error: 'Parameter id is needed please use ?id= at request URL',
        });
  
        return response;
    }

    const { data } = await axios.get(`https://swapi.py4e.com/api/planets/${id}/`)

    const planet: IPlanet = {
        name: data.name,
        rotation_period: data.rotation_period,
        orbital_period: data.orbital_period,
        diameter: data.diameter,
        climate: data.climate,
        gravity: data.gravity,
        terrain: data.terrain,
        surface_water: data.surface_water,
        population: data.population,
        residents: data.residents,
        films: data.films,
        created: data.created,
        edited: data.edited,
        url: data.url
    }
    const tranlatePlanet = tranlater<PlanetMap>(planet, planetTranslation);

    response.body = JSON.stringify(tranlatePlanet);

    return response;


}