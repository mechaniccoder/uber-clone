import { Options } from "graphql-yoga";
import app from "./app";

const PORT: string | number = process.env.PORT || 5000;
const PLAYGROUND: string = "/playground";
const ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: ENDPOINT,
};

const handleAppStart = () => console.log(`${PORT} 작동 중`);

app.start(appOptions, handleAppStart);
