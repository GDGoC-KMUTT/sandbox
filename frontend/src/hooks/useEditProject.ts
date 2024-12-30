import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ProjectResponse, EditProjectPayload } from "../types/project"

const editProject = async (projectData: EditProjectPayload): Promise<ProjectResponse> => {
    const response = await Axios.patch(`/api/project/edit`, {
        name: projectData.name,
        domain: projectData.domain,
        project_id: projectData.project_id,
    })
    if (response.status !== 201) {
        throw new Error("Failed to edit project")
    }
    return response.data
}

const useEditProject = () => {
    return useMutation({
        mutationKey: ["edit-project"],
        mutationFn: editProject,
        onSuccess: (data) => {
            console.log("Edit project successful:", data)
        },
        onError: (error) => {
            console.error("Error editing project:", error)
        },
    })
}

export default useEditProject

