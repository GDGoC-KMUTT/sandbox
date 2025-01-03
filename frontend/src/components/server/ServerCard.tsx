import { useNavigate } from "react-router-dom"
import ActiveStatus from "../ui/ActiveStatus"
import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { PublicServer } from "../../types/server"

const ServerCard: React.FC<PublicServer> = ({ id, hostname, ip, v_cpu, memory, status }) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center gap-[5px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card">
            <h4>{hostname}</h4>
            <div className="flex gap-2">
                <div className="flex justify-center items-center">
                    <GlobeAltIcon className={`w-[21px] text-form`} strokeWidth={1} />
                </div>
                <p>{ip ? ip : "-"}</p>
            </div>
            <div className="flex gap-2">
                <ActiveStatus status={status == "Running" ? true : false} />
                <p>
                    {v_cpu} vCPU / {memory} RAM
                </p>
            </div>
            <div className={"flex justify-end"}>
                <button
                    className="bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                    onClick={() => {
                        navigate(`server/${id}`)
                    }}
                >
                    Manage
                </button>
            </div>
        </div>
    )
}

export default ServerCard
