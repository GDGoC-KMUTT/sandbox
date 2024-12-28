import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerResponse } from "../types/server"

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
        onSuccess: (data) => {
            console.log("Delete server successful:", data)
        },
        onError: (error) => {
            console.error("Error deleting servef:", error)
        },
    })
}

export default useDeleteServer

