import { useNavigate } from "react-router-dom"
import ActiveStatus from "../ui/ActiveStatus"
import { GlobeAltIcon } from "@heroicons/react/24/outline"

interface IServerCard {
    id: number
    hostname: string
    ip: string
    status: boolean
    vcpu: number
    memory: number
}

const ServerCard: React.FC<IServerCard> = ({ id, hostname, ip, status, vcpu, memory }) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center gap-[5px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card">
            <h4>{hostname}</h4>
            <div className="flex gap-2">
                <div className="flex justify-center items-center">
                    <GlobeAltIcon className={"w-[21px] text-form"} strokeWidth={1} />
                </div>
                <p>{ip}</p>
            </div>
            <div className="flex gap-2">
                <ActiveStatus status={status} />
                <p>
                    {vcpu} vCPU / {memory} GB RAM
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
