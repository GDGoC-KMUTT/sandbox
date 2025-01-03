import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerResponse } from "../types/server"
import { toast } from "sonner"

const deleteServer = async ({ projectId, serverId }: { projectId: string; serverId: string }): Promise<ServerResponse> => {
    const response = await Axios.delete(`/api/project/${projectId}/server/${serverId}/delete`)
    if (response.status !== 201) {
        throw new Error("Failed to delete server")
    }
    return response.data
}

const useDeleteServer = () => {
    return useMutation({
        mutationKey: ["delete-server"],
        mutationFn: deleteServer,
        onSuccess: () => {
            toast.success("Delete server successful")
        },
        onError: () => {
            toast.error("Failed to delete server")
        },
    })
}

export default useDeleteServer

