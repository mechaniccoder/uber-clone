import {GraphQLServer} from 'graphql-yoga'
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({});
  }

  private middlewares = () => {
    this.app.express.use(logger('dev'));
    this.app.express.use(cors());
    this.app.express.use(helmet());
  }
}

export default new App().app