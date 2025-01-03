import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { CreateDnsRecord, DomainResponse } from "../types/domain"
import { toast } from "sonner"

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
        onSuccess: () => {
            toast.success("Create dns record successful")
        },
        onError: () => {
            toast.error("Failed to create dns record")
        },
    })
}

export default useCreateDnsRecord

