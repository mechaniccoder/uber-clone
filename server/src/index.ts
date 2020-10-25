import dotenv from "dotenv";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
dotenv.config();
import connectionOptions from "./ormConfig";

const PORT: string | number = process.env.PORT || 5000;
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
