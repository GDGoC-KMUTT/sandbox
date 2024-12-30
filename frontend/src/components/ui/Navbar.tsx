import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import logo2 from "../../assets/logo2.png"
import { useAuth } from "../../stores/authHelpers"
import { useNavigate } from "react-router-dom"
import LogoutModal from "../modal/LogoutModal"
import { useState } from "react"

const Navbar = () => {
    const { logout } = useAuth()
    const navigate = useNavigate() // Initialize the navigate function
    const goBack = () => {
        navigate(-1) // Go back to the previous page
    }
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className="flex items-center justify-between w-[100vw] h-[60px] bg-background p-3 shadow-nav">
            <div className="flex items-center">
                {location.pathname !== "/project" && (
                    <div className="w-[25px] cursor-pointer bg-transparent rounded-full mr-4" onClick={goBack}>
                        <ArrowLeftIcon className="text-foreground" />
                    </div>
                )}
                <div onClick={() => navigate("/project")} className="cursor-pointer">
                    <img src={logo2} className="w-[40px] h-[40px]" />
                </div>
            </div>
            <button onClick={() => setIsOpen(true)}>Logout</button>
            {isOpen && <LogoutModal onClose={() => setIsOpen(false)} onLogout={logout} />}
        </nav>
    )
}

export default Navbar
