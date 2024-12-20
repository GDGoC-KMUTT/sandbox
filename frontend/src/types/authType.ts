export interface User {
    id: number
    firstname: string
    lastname: string
    photoUrl: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: User | null
    loading: boolean
}
