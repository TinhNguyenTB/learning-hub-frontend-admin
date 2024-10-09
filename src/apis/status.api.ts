import { IBackendRes, IStatus } from "@/types/backend";
import { sendRequest } from "@/apis/http";

export const getAllStatus = async () => {
    return await sendRequest<IBackendRes<IStatus[]>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/status`,
        method: 'GET'
    })
}
