import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ProjectResponse, CreateProjectPayload } from "../types/project"

const createProject = async (projectData: CreateProjectPayload): Promise<ProjectResponse> => {
    const response = await Axios.post("/api/project/create", projectData)
    if (response.status !== 201) {
        throw new Error("Failed to create project")
    }
    return response.data
}

const useCreateProject = () => {
    return useMutation({
        mutationKey: ["create-project"],
        mutationFn: createProject,
        onSuccess: (data) => {
            console.log("Create project successful:", data)
        },
        onError: (error) => {
            console.error("Error creating project:", error)
        },
    })
}

export default useCreateProject

