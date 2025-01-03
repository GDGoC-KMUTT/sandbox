import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { CreateServerPayload, ServerResponse } from "../types/server"
import { toast } from "sonner"

const createServer = async (serverData: CreateServerPayload): Promise<ServerResponse> => {
    const response = await Axios.post(`/api/project/${serverData.projectId}/server/create`, {
        hostname: serverData.hostname,
        username: serverData.username,
        password: serverData.password,
        os: serverData.os,
        v_cpu: serverData.v_cpu,
        memory: String(serverData.memory),
        storage: String(serverData.storage),
    })
    if (response.status !== 201) {
        throw new Error("Failed to create server")
    }
    return response.data
}

const useCreateServer = () => {
    return useMutation({
        mutationKey: ["create-server"],
        mutationFn: createServer,
        onSuccess: () => {
            toast.success("Create server successful")
        },
        onError: () => {
            toast.error("Failed to create server")
        },
    })
}

export default useCreateServer

