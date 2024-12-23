export interface Server {
    id: number
    hostname: string
    username: string
    password: string
    ip: string
    os: string
    v_cpu: number
    memory: number
}

export interface PublicServer {
    id: number
    hostname: string
    ip: string
    os: string
    v_cpu: number
    memory: number
}

export interface ServerResponse {
    success: boolean
    data: Server
}

export interface ServerListResponse {
    success: boolean
    data: PublicServer[]
}

export interface CreateServerPayload {
    hostname: string
    username: string
    password: string
    os: string
    v_cpu: number
    memory: number
    projectId?: string
}

export interface EditServerPayload {
    projectId?: string
    serverId?: string
    hostname: string
}
