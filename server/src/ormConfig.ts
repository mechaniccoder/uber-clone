import { ConnectionOptions } from "typeorm";

console.log(process.env);

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: "uber",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.*"],
};

export default connectionOptions;
