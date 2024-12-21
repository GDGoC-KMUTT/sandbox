import useFetchServers from "../../hooks/useFetchServers"
import ServerCard from "./ServerCard"

interface IServerList {
    projectId: string
}

const ServerList: React.FC<IServerList> = ({ projectId }) => {
    const { data, isLoading } = useFetchServers(projectId)

    if (isLoading) {
        return <div>Server loading</div>
    }
    console.log("Here is server list")
    console.log(data?.data)

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
