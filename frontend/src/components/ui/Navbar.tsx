import logo2 from "../../assets/logo2.png"
import { useAuth } from "../../stores/authHelpers"

const Navbar = () => {
    const { logout } = useAuth()
    return (
        <nav className="flex items-center justify-between w-[100vw] h-[60px] bg-background p-3 shadow-nav">
            <img src={logo2} className="w-[40px] h-[40px]" />
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default Navbar
