import express, { response } from "express";
import dayjs from "dayjs";
import database from "./libs/database.js"

import planetsRoutes from "./routes/planets-routes.js"
import router from "./routes/planets-routes.js";
import errors from "./middlewares/errors.js";

database();
const app = express();
app.use(express.json()); //Permet à notre serveur de comprendre le json reçu

//TODO ORANGE COMMENTS !!
app.get("/premiere", (req, res) => {
    res.status(200)
    res.set("content-type", "text/plain")
    res.send("première route avec express")
})

app.get("/date", (req, res) => {
    res.status(200)
    res.set("content-type", "text/plain")
    res.send(dayjs().format())
})

app.get("/maths/:operator", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    let result;
    const operation = req.params.operator

    switch (operation) {
        case "somme":
            result = Number(a) + Number(b);
            break;

        case "quotient":
            result = Number(a) / Number(b);
            break;

        case "difference":
            result = Number(a) - Number(b);
            break;


        case "produit":
            result = Number(a) * Number(b);
            break;

        case "reste":
            result = Number(b) % Number(a);
            break;

        default:
            break;
    }

    res.status(200);
    res.set("content-type", "text/plain");
    res.send(String(result));
})


app.use("/planets", planetsRoutes)




app.use(errors)
export default app;