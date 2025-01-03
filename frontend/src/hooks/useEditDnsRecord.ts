import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { DomainResponse, EditDnsRecord } from "../types/domain"
import { toast } from "sonner"

const editDnsRecord = async (dnsRecordData: EditDnsRecord): Promise<DomainResponse> => {
    const response = await Axios.patch(`/api/project/${dnsRecordData.projectId}/domain/edit/dns`, {
        id: dnsRecordData.id,
        hostname: dnsRecordData.hostname,
        dnstype: dnsRecordData.dnstype,
        target: dnsRecordData.target,
    })
    if (response.status !== 201) {
        throw new Error("Failed to edit dns record")
    }
    return response.data
}

const useEditDnsRecord = () => {
    return useMutation({
        mutationKey: ["edit-dnsrecord"],
        mutationFn: editDnsRecord,
        onSuccess: () => {
            toast.success("Edit domain successful")
        },
        onError: () => {
            toast.error("Failed to edit dns record")
        },
    })
}

export default useEditDnsRecord

