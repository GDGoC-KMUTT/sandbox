import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { ServerResponse } from "../types/server"
import { toast } from "sonner"

const deleteDomain = async ({ projectId, domainId }: { projectId: string; domainId: number }): Promise<ServerResponse> => {
    const response = await Axios.delete(`/api/project/${projectId}/domain/delete`, { data: { id: domainId } })
    if (response.status !== 201) {
        throw new Error("Failed to delete domain")
    }
    return response.data
}

const useDeleteDomain = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-domain"],
        mutationFn: deleteDomain,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["domains"] })
            toast.success("Delete domain successful")
        },
        onError: () => {
            toast.error("Failed to delete domain")
        },
    })
}

export default useDeleteDomain

