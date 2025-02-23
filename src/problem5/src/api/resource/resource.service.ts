import { Resource } from '@domain/entities/resources';
import { BadRequestError, NotFoundError } from '@shared/lib/http/httpError';
import { Like } from 'typeorm';

import {
    CreateResourceRequest,
    DeleteResourceRequest,
    GetListResourceRequest,
    GetResourceByIdRequest,
    UpdateResourceRequest
} from "./resource.type";

class ResourceService {
    async createResource(req: CreateResourceRequest) {
        const existingResource = await Resource.findOneBy({ name: req.name });
        if (existingResource) {
            throw new BadRequestError('Resource with this name already exists');
        }

        const resource = new Resource();
        resource.name = req.name;
        resource.quantity = req.quantity;
        resource.price = req.price;

        return await resource.save();
    }

    async getListResource(req: GetListResourceRequest) {
        const {
            page = 1,
            size = 5,
            sort = 'desc',
            name = ""
        } = req;

        const [sortField, sortOrder] = ["createdAt", sort];

        const [resources, _] = await Resource.findAndCount({
            where: name === "" ? {} : {
                name: Like(`%${name}%`)
            },
            order: {
                [sortField]: sortOrder
            },
            skip: (page - 1) * size,
            take: size
        });

        return {
            data: resources,
            length: resources.length
        };
    }

    async getResourceById(req: GetResourceByIdRequest) {
        const resource = await Resource.findOneBy({ id: req.id });
        if (!resource) {
            throw new NotFoundError('Resource not found');
        }
        return resource;
    }

    async updateResource(req: UpdateResourceRequest) {
        const resource = await Resource.findOneBy({ id: req.id });
        if (!resource) {
            throw new NotFoundError('Resource not found');
        }

        resource.name = req.name ?? resource.name;
        resource.quantity = req.quantity ?? resource.quantity;
        resource.price = req.price ?? resource.price;

        return await resource.save();
    }

    async deleteResource(req: DeleteResourceRequest) {
        const resource = await Resource.findOneBy({ id: req.id });
        if (!resource) {
            throw new NotFoundError('Resource not found');
        }

        await resource.remove();
        return null;
    }
}

const resourceService = new ResourceService();

export default resourceService;