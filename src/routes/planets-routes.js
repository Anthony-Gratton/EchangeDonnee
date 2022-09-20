import express from "express";
import HttpError from "http-errors";
import PLANETS from "../data/planets.js";

import planetsRepository from "../repositories/planets-repository.js"

const router = express.Router();

class PlanetsRoutes {
    // Déjà sous /planets
    constructor() {
        router.get("/", this.getAll)
        router.get("/:idPlanet", this.getOne)
        router.post("/", this.post)
        router.delete("//:idPlanet", this.delete)

    }


    delete(req, res, next) {
        const idPlanet = parseInt(req.params.idPlanet, 10)

        const index = PLANETS.findIndex(p => p.id === idPlanet);
        if (index === - 1) {
            return next(HttpError.ImATeapot(`La planète avec l'identifiant ${idPlanet} n'existe pas`))
        }
        PLANETS.splice(index, 1)
        res.status(204).end();
    }


    async getAll(req, res, next) {
        try {
            const planets = await planetsRepository.retrieveAll();
            res.status(200).json(planets);
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            let planet = await planetsRepository.retrieveOne(req.params.idPlanet);

            if (!planet) {
                return next(HttpError.NotFound(`La planète avec l'identifiant: ${req.params.idPlanet} n'existe pas`))
            }
            planet = planet.toObject({ getters: false, virtuals: false });
            planet = planetsRepository.transform(planet)
            res.status(200).json(planet);
        } catch (err) {
            return next(err);
        }

    }


    async post(req, res, next) {
        try {

            let newPlanet = await planetsRepository.create(req.body);

            newPlanet = newPlanet.toObject({ getters: false, virtuals: false });
            newPlanet = planetsRepository.transform(newPlanet);

            res.status(201).json(newPlanet);

        } catch (err) {
            return next(err);
        }
    }

}

new PlanetsRoutes();
export default router;