import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import resourceController from "./resource.controller";
import resourceSchema from "./resource.schema";

const resourceRouter = express.Router();

resourceRouter.post(
    "/create",
    validator({
        body: resourceSchema.createResource,
    }),
    asyncWrapper(resourceController.createResource),
);

resourceRouter.get(
    "/",
    validator({
        query: resourceSchema.getListResource,
    }),
    asyncWrapper(resourceController.getListResource),
);

resourceRouter.get(
    "/:id",
    validator({
        params: resourceSchema.getResourceById,
    }),
    asyncWrapper(resourceController.getResourceById),
);

resourceRouter.patch(
    "/update/:id",
    validator({
        params: resourceSchema.getResourceById,
        body: resourceSchema.updateResource,
    }),
    asyncWrapper(resourceController.updateResource),
);

resourceRouter.delete(
    "/delete/:id",
    validator({
        params: resourceSchema.deleteResource,
    }),
    asyncWrapper(resourceController.deleteResource),
);

export default resourceRouter;
