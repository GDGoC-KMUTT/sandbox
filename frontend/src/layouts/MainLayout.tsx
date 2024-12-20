import React from "react"
import Navbar from "../components/ui/Navbar.tsx"

interface ILayout {
    headerContent: React.ReactNode
    bodyContent: React.ReactNode
}

const MainLayout: React.FC<ILayout> = ({ headerContent, bodyContent }) => {
    return (
        <div>
            <Navbar />
            <div className="p-[30px]">
                <div className="flex justify-between">{headerContent}</div>
                {bodyContent}
            </div>
        </div>
    )
}

export default MainLayout
