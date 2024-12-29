import { useQuery } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { GetUserResponse } from "../types/project"

const fetchUsers = async (projectId: string): Promise<GetUserResponse> => {
    const response = await Axios.get(`/api/project/${projectId}/suggestions`)
    if (response.status !== 200) {
        throw new Error("Failed to fetch users")
    }
    return response.data
}

const useFetchUsers = (projectId: string) => {
    return useQuery({
        queryKey: ["users", projectId],
        queryFn: () => fetchUsers(projectId),
        retry: 1,
        refetchOnWindowFocus: true,
    })
}

export default useFetchUsers

