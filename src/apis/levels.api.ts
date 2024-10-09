import { IBackendRes, ILevel } from "@/types/backend";
import { sendRequest } from "@/apis/http";

export const getAllLevels = async () => {
    return await sendRequest<IBackendRes<ILevel[]>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/levels`,
        method: 'GET',

    })
}

export const createLevel = async (data: { name: string }) => {
    return await sendRequest<IBackendRes<ILevel>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/levels`,
        method: 'POST',
        body: data
    })
}