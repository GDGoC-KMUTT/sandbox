import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthCallBack from "../../hooks/useAuthCallback"
import { useAuth } from "../../stores/authHelpers"
import PageLoading from "../../components/loader/PageLoading"

function Callback() {
    const navigate = useNavigate()
    const { mutateAsync } = useAuthCallBack()
    const { login } = useAuth()

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search)
            const code = params.get("code")
            const state = params.get("state")

            if (code && state) {
                try {
                    const result = await mutateAsync(code)
                    if (result.data.user) {
                        console.log(result.data.user)
                        login(result.data.user)
                    }
                    navigate("/project")
                } catch (err) {
                    console.error("Error during mutation:", err)
                }
            } else {
                console.error("Missing or invalid query parameters.")
            }
        }

        handleCallback()
    }, [navigate, mutateAsync])

    return <PageLoading />
}

export default Callback
