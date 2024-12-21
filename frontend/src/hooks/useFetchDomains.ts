import { useQuery } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { DomainsResponse } from "../types/domain"

const fetchDomains = async (projectId: string): Promise<DomainsResponse> => {
    const response = await Axios.get(`/api/project/${projectId}/domain/list`)
    if (response.status !== 200) {
        throw new Error("Failed to fetch domains")
    }
    return response.data
}

const useFetchDomains = (projectId: string) => {
    return useQuery({
        queryKey: ["domains", projectId],
        queryFn: () => fetchDomains(projectId),
        retry: 1,
        refetchOnWindowFocus: true,
    })
}

export default useFetchDomains
