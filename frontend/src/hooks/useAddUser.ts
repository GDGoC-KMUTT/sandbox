import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { AddUserPayload, ProjectResponse } from "../types/project"

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
        onSuccess: (data) => {
            console.log("Add user successful:", data)
        },
        onError: (error) => {
            console.error("Error adding user:", error)
        },
    })
}

export default useAddUser

