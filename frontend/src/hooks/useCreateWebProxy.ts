import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { CreateWebProxy, DomainResponse } from "../types/domain"
import { toast } from "sonner"

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
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["create-webproxy"],
        mutationFn: createWebProxy,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["domains"],
            })
            toast.success("Create web proxy successful")
        },
        onError: () => {
            toast.error("Failed to create web proxy")
        },
    })
}

export default useCreateWebProxy

