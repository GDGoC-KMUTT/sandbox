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
    return <div className="flex flex-wrap">{data?.data.map((server, index) => <ServerCard key={index} {...server} />)}</div>
}

export default ServerList
