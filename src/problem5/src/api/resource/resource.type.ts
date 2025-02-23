type Resource = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

type CreateResourceRequest = {
    name: string;
    quantity: number;
    price: number;
}

type GetListResourceRequest = {
    page?: number;
    size?: number;
    sort?: string;
    name?: string;
}

type GetResourceByIdRequest = {
    id: number;
}

type UpdateResourceRequest = {
    id: number;
    name?: string;
    quantity?: number;
    price?: number;
}

type DeleteResourceRequest = GetResourceByIdRequest

export type {
    CreateResourceRequest,
    DeleteResourceRequest,
    GetListResourceRequest,
    GetResourceByIdRequest,
    Resource,
    UpdateResourceRequest,
};