import axios from "axios";
import { PlanetId, IPlanet } from "./Schema/planet.schema";
import { PlanetRepository } from "./planet.repository";

export class PlanetInfraestructure implements PlanetRepository{
    async getPlanetById(id: PlanetId): Promise<IPlanet> {
        const { data } = await axios.get(`https://swapi.py4e.com/api/planets/${id}/`)
        
        if (data.detail) {
            throw new Error(
              `Unable to find planet with id: ${id}, with details from api: ${data.detail}`,
            );
        }

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

        return planet;
    }
}