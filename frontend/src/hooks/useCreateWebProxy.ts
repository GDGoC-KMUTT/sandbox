import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { CreateWebProxy, DomainResponse } from "../types/domain"

const createWebProxy = async (webProxyData: CreateWebProxy): Promise<DomainResponse> => {
    const response = await Axios.post(`/api/project/${webProxyData.projectId}/domain/create/webproxy`, {
        hostname: webProxyData.hostname,
        server_id: webProxyData.server_id,
        port: webProxyData.port,
    })
    if (response.status !== 201) {
        throw new Error("Failed to create server")
    }
    return response.data
}

const useCreateWebProxy = () => {
    return useMutation({
        mutationKey: ["create-webproxy"],
        mutationFn: createWebProxy,
        onSuccess: (data) => {
            console.log("Create webproxy successful:", data)
        },
        onError: (error) => {
            console.error("Error creating webproxy:", error)
        },
    })
}

export default useCreateWebProxy
