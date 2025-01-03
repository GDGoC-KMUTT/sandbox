import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { DeleteUserPayload, ProjectResponse } from "../types/project"
import { toast } from "sonner"

const deleteUser = async (userData: DeleteUserPayload): Promise<ProjectResponse> => {
    const response = await Axios.delete(`/api/project/deleteuser`, {
        data: {
            email: userData.email,
            project_id: userData.project_id,
        },
    })
    if (response.status !== 201) {
        throw new Error("Failed to delete user")
    }
    return response.data
}

const useDeleteUser = () => {
    return useMutation({
        mutationKey: ["delete-user"],
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("Delete user from project successful")
        },
        onError: () => {
            toast.error("Failed to delete user from project")
        },
    })
}

export default useDeleteUser

