import dayjs from "dayjs";
import planetModel from "../models/planet-model.js";
import Planet from "../models/planet-model.js"


const KELVIN = -273.15;

class PlanetsRepository {

    retrieveAll(filter = {}) {

        const filterSansWhere = {};

        const testFiltre = { discoveredBy: 'skadex' } //Where discoveredBy = 'skadex'

        const testFiltreAnd = { temperature: { $gt: 240 }, 'position.y': { $lt: 500 } };

        const testFiltreOr = { $or: [{ temperature: { $gt: 240 }, 'position.y': { $lt: 500 } }] };


        return Planet.find(filter); //select * from planets
    }

    retrieveOne(idPlanet) {
        return Planet.findById(idPlanet); //Select *from planetes Where idPlanet = idPlanet
    }

    create(planet) {
        return Planet.create(planet); //INSERT () INTO planets
    }

    delete(idPlanet) {
        return Planet.findByIdAndDelete(idPlanet);


    }


    transform(planet, transformsOption = {}) {

        if (transformsOption) {

            if (transformsOption.unit === 'c') {
                planet.temperature = planet.temperature + KELVIN;
            }
        }

        //TODO: TP - HEXMatrix
        this.calculateHexMatrix
        //TODO: TP - Wind Direction
        planet.discoveryDate = dayjs(planet.discoveryDate).format("YYYY-MM-DD");
        delete planet.createdAt;
        delete planet.updatedAt;
        delete planet.__v;

        return planet;
    }

    calculateHexMatrix(hexMatrix) {

    }

}

export default new PlanetsRepository();