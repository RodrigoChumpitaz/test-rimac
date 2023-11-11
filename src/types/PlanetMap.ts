import { IPlanet } from '../handlers/handlerPlanet';

export type PlanetMap = {
    [key in keyof IPlanet]: string;
}