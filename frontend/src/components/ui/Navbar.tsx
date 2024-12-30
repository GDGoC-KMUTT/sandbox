import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import logo2 from "../../assets/logo2.png"
import { useAuth } from "../../stores/authHelpers"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const { logout } = useAuth()
    const navigate = useNavigate() // Initialize the navigate function
    const goBack = () => {
        navigate(-1) // Go back to the previous page
    }
    return (
        <nav className="flex items-center justify-between w-[100vw] h-[60px] bg-background p-3 shadow-nav">
            <div className="flex items-center">
                <div className="w-[25px] cursor-pointer bg-transparent rounded-full mr-4" onClick={goBack}>
                    <ArrowLeftIcon className="text-foreground" />
                </div>
                <div onClick={() => navigate("/project")} className="cursor-pointer">
                    <img src={logo2} className="w-[40px] h-[40px]" />
                </div>
            </div>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default Navbar
