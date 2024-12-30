import { useSetAtom } from "jotai"
import { useQuery } from "@tanstack/react-query"
import { authAtom } from "../stores/authAtom"
import Cookies from "js-cookie"
import { Axios } from "../configs/axios/axiosInstance"

const fetchUserData = async () => {
    const response = await Axios.get("/api/profile/info")
    console.log(response.status)
    return response.data
}

export const useAuthInit = () => {
    const setAuthState = useSetAtom(authAtom)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUserData,
        enabled: !!Cookies.get("login"),
    })

    const initializeAuth = () => {
        const token = Cookies.get("login")

        if (token) {
            if (isLoading) {
                setAuthState({ isAuthenticated: false, user: null, loading: true })
            } else if (isError) {
                setAuthState({ isAuthenticated: false, user: null, loading: false })
                console.error("Error fetching user:", error)
            } else {
                console.log(data)
                setAuthState({
                    isAuthenticated: true,
                    user: data.data,
                    loading: false,
                })
            }
        } else {
            setAuthState({ isAuthenticated: false, user: null, loading: false })
        }
    }

    return initializeAuth
}
