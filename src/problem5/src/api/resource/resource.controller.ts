import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { NextFunction, Request, Response } from "express";

import resourceService from "./resource.service";
import { DeleteResourceRequest, GetListResourceRequest, GetResourceByIdRequest, UpdateResourceRequest } from "./resource.type";

class ResourceController {
    @CreatedResponse("Created resource successfully")
    async createResource(req: Request, _res: Response, _next: NextFunction) {

        return resourceService.createResource(req.body);
    }

    @OkResponse("Get list resouces successfully")
    async getListResource(req: Request, _res: Response, _next: NextFunction) {
        return resourceService.getListResource(req.query as unknown as GetListResourceRequest);
    }

    @OkResponse("Get resource by id sucessfully")
    async getResourceById(
        req: Request,
        _res: Response,
        _next: NextFunction,
    ) {
        return resourceService.getResourceById(req.params as unknown as GetResourceByIdRequest);
    }

    @OkResponse("Update resource successfully")
    async updateResource(
        req: Request,
        _res: Response,
        _next: NextFunction,
    ) {
        const payload: UpdateResourceRequest = {
            id: Number(req.params.id),
            ...req.body
        };
        return resourceService.updateResource(payload);
    }

    @OkResponse("Delete resource successfully")
    async deleteResource(
        req: Request,
        _res: Response,
        _next: NextFunction,
    ) {
        return resourceService.deleteResource(req.params as unknown as DeleteResourceRequest);
    }

}

const resourceController = new ResourceController();
export default resourceController;
