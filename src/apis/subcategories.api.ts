import { IBackendRes, IModelPaginate, ISubcategory } from "@/types/backend";
import { sendRequest } from "@/apis/http";
import { getCookies } from "@/utils/cookies";

const { access_token } = getCookies()

export const getAllSubcategories = async (current: number, pageSize: number, search?: string) => {
    return await sendRequest<IBackendRes<IModelPaginate<ISubcategory>>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories`,
        method: 'GET',
        queryParams: {
            current,
            pageSize,
            search
        }
    })
}

export const createSubcategory = async (data: { name: string; categoryId: string }) => {
    return await sendRequest<IBackendRes<ISubcategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories`,
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const deleteSubcategoryById = async (id: string) => {
    return await sendRequest<IBackendRes<ISubcategory>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/subcategories/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
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