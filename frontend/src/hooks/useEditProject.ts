import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ProjectResponse, EditProjectPayload } from "../types/project"
import { toast } from "sonner"

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
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["edit-project"],
        mutationFn: editProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            })
            toast.success("Edit project successful")
        },
        onError: () => {
            toast.error("Failed to edit project")
        },
    })
}

export default useEditProject

