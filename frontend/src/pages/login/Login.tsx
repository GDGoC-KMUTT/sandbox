import { Link, useNavigate } from "react-router-dom"
import { authAtom } from "../../stores/authAtom"
import { useAtom } from "jotai"
import { useEffect } from "react"

const Login = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [authState] = useAtom(authAtom)

    const navigate = useNavigate()

    useEffect(() => {
        if (authState.loading == false && authState.isAuthenticated) {
            navigate("/project")
        }
    }, [authState.isAuthenticated, navigate])

    return (
        <div>
            <div>Here is the login page</div>
            <Link to={`${backendURL}/api/public/login/redirect`}>
                <button>Login</button>
            </Link>
        </div>
    )
}

export default Login
