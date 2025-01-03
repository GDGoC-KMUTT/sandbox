import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { AddUserPayload, ProjectResponse } from "../types/project"
import { toast } from "sonner"

const addUser = async (userData: AddUserPayload): Promise<ProjectResponse> => {
    const response = await Axios.post(`/api/project/adduser`, {
        email: userData.email,
        project_id: userData.project_id,
    })
    if (response.status !== 201) {
        throw new Error("Failed to add user")
    }
    return response.data
}

const useAddUser = () => {
    return useMutation({
        mutationKey: ["add-user"],
        mutationFn: addUser,
        onSuccess: () => {
            toast.success("Add user successful")
        },
        onError: () => {
            toast.error("Failed to add user")
        },
    })
}

export default useAddUser

