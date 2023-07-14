import mongoose from "mongoose";
import config from "./config.js";

const URL = config.URL_MONGODB_ATLAS

mongoose
    .connect(URL)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.log(error))