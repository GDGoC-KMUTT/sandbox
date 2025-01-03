import { useMutation } from "@tanstack/react-query"
import { Axios } from "../configs/axios/axiosInstance"
import { toast } from "sonner"

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
        onError: () => {
            toast.success("Callback success")
        },
        onSuccess: () => {
            toast.error("Callback error")
        },
    })
}

export default useAuthCallBack
