import express from "express";
import cors from "cors";
import database from "./database";

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

  routes() {}
}

export default new App().app;

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const router = require("./src/routes/router");
// const database = require("./database");

// database();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors());
// app.use("/api", router);

// module.exports = app;
