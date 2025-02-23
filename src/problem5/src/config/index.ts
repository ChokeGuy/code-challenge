import * as dotenv from "dotenv";
import { NodeEnv } from "src/shared/constant/config";

dotenv.config();

interface Config {
    port: number;
    nodeEnv: NodeEnv;
    dbHost: string;
    dbUser: string;
    dbPassword: string;
    dbPort: number;
    dbName: string;
    writeLogFile: boolean;
}

const config: Config = {
    port: Number(process.env.PORT ?? "3000"),
    dbHost: process.env.DB_HOST ?? "localhost",
    dbPort: Number(process.env.DB_PORT ?? "5432"),
    dbUser: process.env.DB_USER ?? "posgres",
    dbPassword: process.env.DB_PASSWORD ?? "password",
    dbName: process.env.DB_NAME ?? "event-db",
    nodeEnv: (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.DEV,
    writeLogFile: process.env.NODE_ENV !== "DEV",
};

export default config;
