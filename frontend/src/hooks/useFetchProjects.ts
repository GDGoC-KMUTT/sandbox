import { useQuery } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ProjectsResponse } from "../types/project"

const fetchProjects = async (): Promise<ProjectsResponse> => {
    const response = await Axios.get("/api/project/list")
    if (response.status !== 200) {
        throw new Error("Failed to fetch servers")
    }
    return response.data
}

const useFetchProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        retry: 1,
        refetchOnWindowFocus: true,
    })
}

export default useFetchProjects
