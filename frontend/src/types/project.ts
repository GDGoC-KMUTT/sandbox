export interface UserAvatar {
    email: string
    photo_url: string | null
}

export interface Project {
    project_id: number
    name: string
    domain: string
    users: UserAvatar[]
    created_at: string
}

export interface ProjectsResponse {
    success: boolean
    data: Project[]
}

export interface ProjectResponse {
    success: boolean
    data: Project
}

export interface CreateProjectPayload {
    name: string
    domain: string
}
