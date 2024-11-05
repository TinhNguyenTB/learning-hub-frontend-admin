import { IUser, Session } from "@/contexts/AuthProvider";
import { sendRequest } from "./http";
import { IBackendRes } from "@/types/backend";

export const login = async (data: { email: string; password: string }) => {
    return await sendRequest<IBackendRes<Omit<Session, 'handleLogout'>>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/auth/login`,
        method: 'POST',
        body: data
    })
}

export const getUserInfo = async (id: string, access_token: string) => {
    return await sendRequest<IBackendRes<IUser>>({
        url: `${import.meta.env.VITE_BASE_BACKEND_URL}/api/v1/users/${id}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}