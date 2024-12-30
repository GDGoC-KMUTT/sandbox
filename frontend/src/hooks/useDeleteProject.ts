import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerResponse } from "../types/server"

const deleteProject = async ({ projectId }: { projectId: string }): Promise<ServerResponse> => {
    const response = await Axios.delete(`/api/project/${projectId}/delete`)
    if (response.status !== 201) {
        throw new Error("Failed to delete project")
    }
    return response.data
}

const useDeleteProject = () => {
    return useMutation({
        mutationKey: ["delete-project"],
        mutationFn: deleteProject,
        onSuccess: (data) => {
            console.log("Delete server successful:", data)
        },
        onError: (error) => {
            console.error("Error deleting servef:", error)
        },
    })
}

export default useDeleteProject

