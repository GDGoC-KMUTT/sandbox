import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerResponse } from "../types/server"
import { toast } from "sonner"

const deleteProject = async ({ projectId }: { projectId: string }): Promise<ServerResponse> => {
    const response = await Axios.delete(`/api/project/${projectId}/delete`)
    if (response.status !== 201) {
        throw new Error("Failed to delete project")
    }
    return response.data
}

const useDeleteProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-project"],
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: "projects" })
            toast.success("Delete server successful")
        },
        onError: () => {
            toast.error("Failed to delete server")
        },
    })
}

export default useDeleteProject

