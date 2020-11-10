import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({ schema });
    this.middlewares();
  }

  private middlewares = () => {
    this.app.express.use(logger("dev"));
    this.app.express.use(cors());
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (req: any, res: any, next: any) => {
    const token = req.get("X-JWT");
    console.log(token);

    if (token) {
      const user = await decodeJWT(token);
    }
    next();
  };
}

export default new App().app;
