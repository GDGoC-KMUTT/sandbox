import logo2 from "../../assets/logo2.png"

const Navbar = () => {
    return (
        <nav className="flex items-center w-[100vw] h-[60px] bg-background p-3 shadow-nav">
            <img src={logo2} className="w-[40px] h-[40px]" />
        </nav>
    )
}

export default Navbar
