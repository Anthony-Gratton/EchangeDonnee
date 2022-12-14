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
        router.delete("/:idPlanet", this.delete)

    }


    async delete(req, res, next) {
        try {
            const idPlanet = req.params.idPlanet
            const deleteResult = await planetsRepository.delete(idPlanet)
            if (deleteResult) {
                res.status(204).end()
            } else {
                return next(HttpError.NotFound(`La planète avec l'identifiant: ${req.params.idPlanet} n'existe pas`))
            }
        } catch (err) {
            return next(err)
        }

    }


    async getAll(req, res, next) {
        try {

            const transformsOption = {};
            const filter = {};

            if (req.query.unit) {
                const unit = req.query.unit;
                if (unit === 'c') {
                    transformsOption.unit = unit;
                } else {
                    return next(HttpError.BadRequest('Le paramàtre unit doit avoir comme valeur c pour Celsius'))
                }

            }

            if (req.query.explorer) {
                filter.discoveredBy = req.query.explorer;
            }
            let planets = await planetsRepository.retrieveAll(filter);
            //transformation
            planets = planets.map(p => {
                p = p.toObject({ getters: false, virtuals: false });
                p = planetsRepository.transform(p, transformsOption);
                return p;
            })

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