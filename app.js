import express from "express";
import cors from "cors";
import database from "./database";

import userRoutes from "./src/routes/userRoutes";
import loginRoutes from "./src/routes/loginRoutes";

class App {
  constructor() {
    this.app = express();
    this.db = database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api", userRoutes);
    this.app.use("/api", loginRoutes);
  }
}

export default new App().app;
