import { IBackendRes, ICourse, IModelPaginate } from "@/types/backend";
import { sendRequest } from "@/apis/http";

export const getAllCourses = async (current: number, pageSize: number, search?: string) => {
    return await sendRequest<IBackendRes<IModelPaginate<ICourse>>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/courses`,
        method: 'GET',
        queryParams: {
            current,
            pageSize,
            search
        }
    })
}

export const changeStatus = async (statusName: string, id: string) => {
    return await sendRequest<IBackendRes<ICourse>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/courses/change-status`,
        method: 'POST',
        body: {
            id,
            statusName
        }
    })
}