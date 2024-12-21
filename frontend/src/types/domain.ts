export interface Domain {
    id: number
    hostname: string
    dnstype: string
    target: string
    server: string
    port: number
}

export interface PublicDomain {
    id: number
    hostname: string
    dnstype: string
    target: string
    server: string
    // port: number
}

export interface DomainResponse {
    success: boolean
    data: Domain
}

export interface ServerListResponse {
    success: boolean
    data: PublicDomain[]
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

