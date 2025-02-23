import { limit, page, positiveNumber, sort } from "@shared/schema";
import Joi from "joi";

import {
    CreateResourceRequest,
    GetListResourceRequest,
    GetResourceByIdRequest,
    UpdateResourceRequest
} from "./resource.type";

const createResource = Joi.object<CreateResourceRequest>({
    name: Joi.string().required(),
    quantity: positiveNumber.required(),
    price: positiveNumber.required(),
});

const getListResource = Joi.object<GetListResourceRequest>({
    page: page.optional().default(1),
    size: limit.optional().default(5),
    sort: sort.optional().default("desc"),
    name: Joi.string().optional().default(""),
});

const getResourceById = Joi.object<GetResourceByIdRequest>({
    id: Joi.number().required(),
});

const updateResource = Joi.object<UpdateResourceRequest>({
    name: Joi.string().optional(),
    quantity: positiveNumber.optional(),
    price: positiveNumber.optional(),
})
const deleteResource = getResourceById

const resourceSchema = {
    createResource,
    getListResource,
    getResourceById,
    updateResource,
    deleteResource,
};

export default resourceSchema;
