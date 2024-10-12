import { IBackendRes, ICategory } from "@/types/backend";
import { sendRequest } from "@/apis/http";

export const getAllCategories = async () => {
    return await sendRequest<IBackendRes<ICategory[]>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/categories`,
        method: 'GET'
    })
}

export const createCategory = async (data: { name: string }) => {
    return await sendRequest<IBackendRes<ICategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/categories`,
        method: 'POST',
        body: data
    })
}

export const deleteCategoryById = async (id: string) => {
    return await sendRequest<IBackendRes<ICategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/categories/${id}`,
        method: 'DELETE'
    })
}

export const updateCategory = async (id: string, name: string) => {
    return await sendRequest<IBackendRes<ICategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/categories/${id}`,
        method: 'PATCH',
        body: {
            name
        }
    })
}