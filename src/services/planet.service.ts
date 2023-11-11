import { PlanetId } from "../modules/Planet/Schema/planet.schema";
import { PlanetRepository } from "../modules/Planet/planet.repository";

export class PlanetService {
    private repository: PlanetRepository;

    constructor(repository: PlanetRepository) {
        this.repository = repository;
    }
    async getPlanetById(id: PlanetId) {
        return await this.repository.getPlanetById(id);
    }
}