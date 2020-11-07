import dotenv from "dotenv";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
dotenv.config();

import app from "./app";
import connectionOptions from "./ormConfig";
import User from "./entity/User";

const PORT: string | number = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: ENDPOINT,
};

const handleAppStart = () => console.log(`${PORT} 작동 중`);

createConnection(connectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
