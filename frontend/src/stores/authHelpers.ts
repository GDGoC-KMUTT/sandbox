import { useSetAtom } from "jotai"
import { authAtom } from "./authAtom"
import { User } from "../types/authType"
import Cookies from "js-cookie"

export const useAuth = () => {
    const setAuthState = useSetAtom(authAtom)

    const login = (user: User) => {
        setAuthState({ isAuthenticated: true, user, loading: false })
    }

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null, loading: false })
        Cookies.remove("login")
    }

    return { login, logout }
}
