import { IPlanet, PlanetId } from "./Schema/planet.schema";

export interface PlanetRepository {
    getPlanetById(id: PlanetId): Promise<IPlanet>;
}