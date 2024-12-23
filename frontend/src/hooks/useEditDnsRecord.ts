import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { DomainResponse, EditDnsRecord } from "../types/domain"

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
        onSuccess: (data) => {
            console.log("Edit dns record successful:", data)
        },
        onError: (error) => {
            console.error("Error editing dns record:", error)
        },
    })
}

export default useEditDnsRecord

