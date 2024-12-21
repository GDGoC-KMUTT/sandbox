import useFetchServers from "../../hooks/useFetchServers"
import ServerCardLoading from "../loader/ServerCardLoading"
import ServerCard from "./ServerCard"

interface IServerList {
    projectId: string
}

const ServerList: React.FC<IServerList> = ({ projectId }) => {
    const { data, isLoading } = useFetchServers(projectId)

    if (isLoading) {
        return (
            <div className="flex flex-wrap">
                <ServerCardLoading />
                <ServerCardLoading />
                <ServerCardLoading />
                <ServerCardLoading />
            </div>
        )
    }
    if (!data?.data || data.data.length === 0) {
        return <div className="text-center my-[100px]">No servers available</div>
    }
    return (
        <div className="flex flex-wrap">
            {data?.data.map((server, index) => (
                <ServerCard key={index} {...server} />
            ))}
        </div>
    )
}

export default ServerList
