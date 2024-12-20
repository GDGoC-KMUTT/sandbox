import { useQuery } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerResponse } from "../types/server"

const fetchServer = async (projectId: string, serverId: string): Promise<ServerResponse> => {
    const response = await Axios.get(`/api/project/${projectId}/server/${serverId}`)
    if (response.status !== 200) {
        throw new Error("Failed to fetch server")
    }
    return response.data
}

const useFetchServerInfo = (projectId: string, serverId: string) => {
    return useQuery({
        queryKey: ["servers", projectId, serverId],
        queryFn: () => fetchServer(projectId, serverId),
        retry: 1,
        refetchOnWindowFocus: true,
    })
}

export default useFetchServerInfo
