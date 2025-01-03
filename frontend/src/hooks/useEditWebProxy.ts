import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { DomainResponse, EditWebProxy } from "../types/domain"
import { toast } from "sonner"

const editWebProxy = async (dnsRecordData: EditWebProxy): Promise<DomainResponse> => {
    const response = await Axios.patch(`/api/project/${dnsRecordData.projectId}/domain/edit/webproxy`, {
        id: dnsRecordData.id,
        hostname: dnsRecordData.hostname,
        server_id: dnsRecordData.server_id,
        port: dnsRecordData.port,
    })
    if (response.status !== 201) {
        throw new Error("Failed to edit dns record")
    }
    return response.data
}

const useEditWebProxy = () => {
    return useMutation({
        mutationKey: ["edit-webproxy"],
        mutationFn: editWebProxy,
        onSuccess: () => {
            toast.success("Edit web proxy successful")
        },
        onError: () => {
            toast.error("Failed to edit web proxy")
        },
    })
}

export default useEditWebProxy

