import { IBackendRes, ISubcategory } from "@/types/backend";
import { sendRequest } from "@/apis/http";

export const getAllSubcategories = async () => {
    return await sendRequest<IBackendRes<ISubcategory[]>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories`,
        method: 'GET'
    })
}

export const createSubcategory = async (data: { name: string }) => {
    return await sendRequest<IBackendRes<ISubcategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories`,
        method: 'POST',
        body: data
    })
}

export const deleteSubcategoryById = async (id: string) => {
    return await sendRequest<IBackendRes<ISubcategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories/${id}`,
        method: 'DELETE'
    })
}

export const updateSubcategory = async (id: string, name: string) => {
    return await sendRequest<IBackendRes<ISubcategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories/${id}`,
        method: 'PATCH',
        body: {
            name
        }
    })
}