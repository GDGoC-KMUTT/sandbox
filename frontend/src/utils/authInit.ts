import { useSetAtom } from "jotai"
import Cookies from "js-cookie"
import { authAtom, tokenAtom } from "../stores/authAtom"

export const useAuthInit = () => {
    const setAuthState = useSetAtom(authAtom)
    const setToken = useSetAtom(tokenAtom)

    const initializeAuth = () => {
        const token = Cookies.get("session")
        if (token) {
            setAuthState({
                isAuthenticated: true,
                user: { id: 1, firstname: "Cached", lastname: "Mink", photourl: "https://picture.com" },
                loading: false,
            })
            setToken(token)
        } else {
            setAuthState({ isAuthenticated: false, user: null, loading: false })
        }
    }

    return initializeAuth
}
