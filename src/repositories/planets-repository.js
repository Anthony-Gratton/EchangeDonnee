import dayjs from "dayjs";
import planetModel from "../models/planet-model.js";
import Planet from "../models/planet-model.js"

class PlanetsRepository {

    retrieveAll() {
        return Planet.find(); //select * from planets
    }

    retrieveOne(idPlanet) {
        return Planet.findById(idPlanet); //Select *from planetes Where idPlanet = idPlanet
    }

    create(planet) {
        return Planet.create(planet); //INSERT () INTO planets
    }


    transform(planet) {

        planet.discoveryDate = dayjs(planet.discoveryDate).format("YYYY-MM-DD");
        delete planet.createdAt;
        delete planet.updatedAt;
        delete planet.__v;

        return planet;
    }

}

export default new PlanetsRepository();