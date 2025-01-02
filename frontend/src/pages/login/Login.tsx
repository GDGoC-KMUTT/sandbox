import { useNavigate } from "react-router-dom"
import { authAtom } from "../../stores/authAtom"
import { useAtom } from "jotai"
import { useEffect } from "react"
import logo from "../../assets/logo1.png"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import logoBackground from "../../assets/login_background.png"

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
        <div
            className={`fixed w-full h-screen bg-cover bg-center flex flex-col justify-center items-start px-14`}
            style={{
                backgroundImage: `url(${logoBackground})`,
            }}
        >
            <div className="flex items-center space-x-4">
                <div className="w-[100px] h-[100px]">
                    <img src={logo} alt="Logo" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-background">Bookmark</h1>
                    <h2 className="text-2xl text-background">Sandbox</h2>
                </div>
            </div>
            <div className="my-4">
                <a href={`${backendURL}/api/public/login/redirect`}>
                    <button className="w-[300px] h-[50px] px-6 py-2  flex space-x-2 items-center justify-center text-background bg-white bg-opacity-30 rounded-lg hover:bg-opacity-50 hover:border-none active:border-none">
                        <h2 className="font-bold">Login</h2>
                        <ChevronRightIcon width={"25px"} height={"25px"} />
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Login
