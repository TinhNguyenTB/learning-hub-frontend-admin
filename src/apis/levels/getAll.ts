import axiosInstance from "@/configs/axios.interceptor";

export const getAllLevels = async () => {
    return await axiosInstance.get("/api/v1/levels")
}