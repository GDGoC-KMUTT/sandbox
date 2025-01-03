import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ProjectResponse, CreateProjectPayload } from "../types/project"
import { toast } from "sonner"

const createProject = async (projectData: CreateProjectPayload): Promise<ProjectResponse> => {
    const response = await Axios.post("/api/project/create", projectData)
    if (response.status !== 201) {
        throw new Error("Failed to create project")
    }
    return response.data
}

const useCreateProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["create-project"],
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: "projects" })
            toast.success("Create project successful")
        },
        onError: () => {
            toast.error("Failed to create project")
        },
    })
}

export default useCreateProject

