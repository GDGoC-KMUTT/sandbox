import { useQuery } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerListResponse } from "../types/server"

const fetchServers = async (projectId: string): Promise<ServerListResponse> => {
    const response = await Axios.get(`/api/project/${projectId}/server/list`)
    if (response.status !== 200) {
        throw new Error("Failed to fetch servers")
    }
    return response.data
}

const useFetchServers = (projectId: string) => {
    return useQuery({
        queryKey: ["servers", projectId],
        queryFn: () => fetchServers(projectId),
        retry: 1,
        refetchOnWindowFocus: true,
    })
}

export default useFetchServers
