import Planet from "../models/planet-model.js"

class PlanetsRepository {

    retrieveAll() {
        return Planet.find(); //select * from planets
    }
}

export default new PlanetsRepository();