import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response, Request } from "express";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: (req) => ({ req: req.request }),
    });
    this.middlewares();
  }

  private middlewares = () => {
    this.app.express.use(logger("dev"));
    this.app.express.use(cors());
    // this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (req: any, res: Response, next: NextFunction) => {
    const token = req.get("X-JWT");

    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = null;
      }
    }
    next();
  };
}

export default new App().app;
