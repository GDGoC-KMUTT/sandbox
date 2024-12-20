import { CpuChipIcon, ViewColumnsIcon, CloudIcon, GlobeAltIcon } from "@heroicons/react/24/outline"

interface IServerInfo {
    vcpu: number
    ram: number
    storage: number
    ip: string
}

const ServerInfoCard: React.FC<IServerInfo> = ({ vcpu, ram, storage, ip }) => {
    return (
        <div className="flex flex-col gap-[5px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card">
            <h2>Server Information</h2>
            <div className="flex items-center gap-2">
                <CpuChipIcon className="w-5 h-5 text-form" />
                <p>{vcpu} vCPU</p>
            </div>
            <div className="flex items-center gap-2">
                <ViewColumnsIcon className="w-5 h-5 text-form" />
                <p>{ram} GB Memory</p>
            </div>
            <div className="flex items-center gap-2">
                <CloudIcon className="w-5 h-5 text-form" />
                <p>{storage} Mb Storage</p>
            </div>
            <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5 text-form" />
                <p>{ip}</p>
            </div>
        </div>
    )
}

export default ServerInfoCard
