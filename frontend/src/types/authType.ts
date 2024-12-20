export interface User {
    id: number
    firstname: string
    lastname: string
    photourl: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: User | null
}
