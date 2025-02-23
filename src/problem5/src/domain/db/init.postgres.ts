import config from "@config/index";
import { DataSource } from "typeorm";

import "reflect-metadata";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    synchronize: false, // for migrations
    logging: false,
    entities: [__dirname + "/../entities/**/*.ts"],
    migrations: [__dirname + "/../migrations/**/*.ts"],
    subscribers: [],
});