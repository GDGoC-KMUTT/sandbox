import { useQuery } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ProjectResponse } from "../types/project"

const fetchProject = async (projectId: string): Promise<ProjectResponse> => {
    const response = await Axios.get(`/api/project/${projectId}`)
    if (response.status !== 200) {
        throw new Error("Failed to fetch project")
    }
    return response.data
}

const useFetchProjectInfo = (projectId: string) => {
    return useQuery({
        queryKey: ["projects", projectId],
        queryFn: () => fetchProject(projectId),
        retry: 1,
        refetchOnWindowFocus: true,
    })
}

export default useFetchProjectInfo
