import { IPlanet } from "../../modules/Planet/Schema/planet.schema";

export type PlanetMap = {
    [key in keyof IPlanet]: string;
}