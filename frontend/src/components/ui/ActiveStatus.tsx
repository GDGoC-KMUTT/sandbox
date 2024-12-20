import React from "react"
import on from "../../assets/active-on.svg"
import off from "../../assets/active-off.svg"

interface IActiveStatus {
    status: boolean
}

const ActiveStatus: React.FC<IActiveStatus> = ({ status }) => {
    return (
        <div className="w-[20px] h-[20px]">
            <img src={status ? on : off} alt="Active Status" className="w-full h-full" />
        </div>
    )
}

export default ActiveStatus
