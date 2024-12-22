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

export interface AddUserPayload {
    email: string
    project_id: number
}
export interface DeleteUserPayload {
    email: string
    project_id: number
}
export interface EditProjectPayload {
    project_id: number
    name: string
    domain: string
}
