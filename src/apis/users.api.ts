import { IBackendRes, IModelPaginate } from "@/types/backend";
import { sendRequest } from "@/apis/http";
import { getCookies } from "@/utils/cookies";
import { IUser } from "@/contexts/AuthProvider";

const { access_token } = getCookies()

export const getAllUsers = async (current: number, pageSize: number, search?: string) => {
    return await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/users`,
        method: 'GET',
        queryParams: {
            current,
            pageSize,
            search
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const createUser = async (data: { email: string, name: string, password: string }) => {
    return await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/users`,
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const deleteUserById = async (deleted: boolean, id: string) => {
    return await sendRequest<IBackendRes<any>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/users/${id}`,
        method: 'DELETE',
        body: {
            deleted
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const changeUserRole = async (role: string, id: string) => {
    return await sendRequest<IBackendRes<any>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/users/change-role/${id}`,
        method: 'POST',
        body: {
            role
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}