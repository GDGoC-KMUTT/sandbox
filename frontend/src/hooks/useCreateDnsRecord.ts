import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { CreateDnsRecord, DomainResponse } from "../types/domain"

const createDnsRecord = async (dnsRecordData: CreateDnsRecord): Promise<DomainResponse> => {
    const response = await Axios.post(`/api/project/${dnsRecordData.projectId}/domain/create/dns`, {
        hostname: dnsRecordData.hostname,
        dnstype: dnsRecordData.dnstype,
        target: dnsRecordData.target,
    })
    if (response.status !== 201) {
        throw new Error("Failed to create dns record")
    }
    return response.data
}

const useCreateDnsRecord = () => {
    return useMutation({
        mutationKey: ["create-dnsrecord"],
        mutationFn: createDnsRecord,
        onSuccess: (data) => {
            console.log("Create dns record successful:", data)
        },
        onError: (error) => {
            console.error("Error creating dns record:", error)
        },
    })
}

export default useCreateDnsRecord

