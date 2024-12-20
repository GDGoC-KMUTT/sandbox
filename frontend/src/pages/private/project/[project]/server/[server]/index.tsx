import CredentialCard from "../../../../../../components/server/CredentialCard"
import ServerInfoCard from "../../../../../../components/server/ServerInfoCard"
import MainLayout from "../../../../../../layouts/MainLayout"
import useFetchServerInfo from "../../../../../../hooks/useFetchServerInfo"
import { useParams } from "react-router-dom"
import useFetchProjectInfo from "../../../../../../hooks/useFetchProjectInfo"

const index = () => {
    const { project: projectId, server: serverId } = useParams()

    const projectIdNumber = parseInt(projectId || "", 10)
    if (projectId == null || isNaN(projectIdNumber)) {
        return <div>Error: Invalid project ID</div>
    }

    const serverIdNumber = parseInt(projectId || "", 10)
    if (serverId == null || isNaN(serverIdNumber)) {
        return <div>Error: Invalid Server ID</div>
    }

    const { data: project, isLoading: isProjectLoading } = useFetchProjectInfo(projectId)
    const { data: server, isLoading: isServerLoading } = useFetchServerInfo(projectId, serverId)

    if (isProjectLoading || isServerLoading) {
        return <div>Server loading</div>
    }

    if (server == null || project == null) {
        return <div>Error: Server not exist</div>
    }

    const headerContent = (
        <>
            <div className={"flex flex-col gap-[10px]"}>
                <h2>{project.data.name}</h2>
                <div className={"flex gap-2"}>
                    <h3>{project.data.domain}</h3>
                </div>
            </div>
        </>
    )

    const bodyContent = (
        <div className="flex gap-5">
            <ServerInfoCard ip={server.data.ip} ram={server.data.memory} storage={server.data.memory} vcpu={server.data.v_cpu} />
            <CredentialCard user={server.data.username} password={server.data.password} />
        </div>
    )
    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}
export default index
