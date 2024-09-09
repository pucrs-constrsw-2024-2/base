import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log("\n\n##############################################\n");
      console.log("    🚀 Servidor rodando na porta %s!", this.port);
      console.log("\n##############################################\n");
    });
  }
}
