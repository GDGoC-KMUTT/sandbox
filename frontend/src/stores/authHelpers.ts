import { useSetAtom } from "jotai"
import { authAtom, tokenAtom } from "./authAtom"
import { User } from "../types/authType"
import Cookies from "js-cookie"

export const useAuth = () => {
    const setAuthState = useSetAtom(authAtom)
    const setToken = useSetAtom(tokenAtom)

    const login = (user: User, token: string) => {
        setAuthState({ isAuthenticated: true, user, loading: true })
        setToken(token)
        Cookies.set("session", token, { secure: true, sameSite: "strict", expires: 7 })
    }

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null, loading: true })
        setToken("")
        Cookies.remove("session")
    }

    return { login, logout }
}
