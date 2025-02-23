import logger from "@shared/lib/logger";

import { AppDataSource } from "./init.postgres";

AppDataSource.initialize()
    .then(async () => {
        logger.info("Database connected successfully");
    })
    .catch((error) => logger.error(error));