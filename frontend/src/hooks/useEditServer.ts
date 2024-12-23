import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { EditServerPayload, ServerResponse } from "../types/server"

const editServer = async (serverData: EditServerPayload): Promise<ServerResponse> => {
    const response = await Axios.patch(`/api/project/${serverData.projectId}/server/${serverData.serverId}/edit`, {
        project_id: serverData.projectId,
        hostname: serverData.hostname,
        server_id: serverData.serverId,
    })
    if (response.status !== 201) {
        throw new Error("Failed to edit server")
    }
    return response.data
}

const useEditServer = () => {
    return useMutation({
        mutationKey: ["edit-server"],
        mutationFn: editServer,
        onSuccess: (data) => {
            console.log("Edit server successful:", data)
        },
        onError: (error) => {
            console.error("Error editing server:", error)
        },
    })
}

export default useEditServer

