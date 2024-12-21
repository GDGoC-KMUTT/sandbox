import { PublicServer } from "./server"

export interface Domain {
    id: number
    hostname: string
    dnstype: string
    target: string
    service: string
    server: PublicServer | null
    port: number
}

export interface DomainResponse {
    success: boolean
    data: Domain
}

export interface DomainsResponse {
    success: boolean
    data: Domain[]
}

export interface CreateDomainPayload {
    hostname: string
    dnstype: string
    target: string
    server_id: number
    port: number
    projectId?: string
    service: string
}
export interface CreateDnsRecord {
    hostname: string
    dnstype: string
    target: string
    projectId?: string
}

export interface CreateWebProxy {
    hostname: string
    server_id: number
    port: number
    projectId?: string
}
