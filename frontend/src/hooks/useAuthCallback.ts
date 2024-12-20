import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"

const sendCodeToCallback = async (code: string) => {
    const response = await Axios.post("/api/public/login/callback", { code })
    if (response.status !== 200) {
        throw new Error("Failed to process callback")
    }
    return response.data
}

const useAuthCallBack = () => {
    return useMutation({
        mutationKey: ["auth-callback"],
        mutationFn: sendCodeToCallback,
        onError: (err) => {
            console.error("Error in callback", err)
        },
        onSuccess: (data) => {
            console.log("Callback successful:", data)
        },
    })
}

export default useAuthCallBack
