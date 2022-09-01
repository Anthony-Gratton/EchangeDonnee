import express from "express";

const app = express()

//TODO ORANGE COMMENTS !!
app.get("/premiere", (req, res) => {
    res.status(200)
    res.set("content-type", "text/plain")
    res.send("première route avec express")
})

export default app;