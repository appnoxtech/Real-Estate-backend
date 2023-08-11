import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import helmet from 'helmet';
import compression from "compression";
import mainRouter from "./mainRoutes";

class Server {
  expressInstance: Express;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetup();
    this.routingSetup();
  }

  public middlewareSetup(): void {
    // Setup requests gZip compression
    this.expressInstance.use(compression());
    this.expressInstance.use(cors());

    // const options = {
    //   origin: "*",
    //   methods: "GET,POST,DELETE,PATCH,PUT",
    //   credentials: false,
    // };
   // this.expressInstance.use(cors());
    // // Setup Cross Origin access
    // this.expressInstance.use(cors({
    //   methods:['GET', 'POST', 'PUT', 'DELETE']
    // }));

    // Setup requests format parsing (Only JSON requests will be valid)
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());
  }

  public routingSetup() {
    // Add mainRouter object to server routes
    this.expressInstance.use("/", mainRouter);
  }
}

export default Server;
