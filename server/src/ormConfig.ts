import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: "uber",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
};

export default connectionOptions;
