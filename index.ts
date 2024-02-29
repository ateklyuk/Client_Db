import express from "express";
import {logger} from "./logger";
import {config} from "./config";

const app = express();

app.use(express.json());
const start = ()=> {
    app.get("/ping", (req, res) => res.send("pong " + Date.now()));
    app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
};

start()