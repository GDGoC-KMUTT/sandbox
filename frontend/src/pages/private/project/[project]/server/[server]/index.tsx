import CredentialCard from "../../../../../../components/server/CredentialCard"
import ServerInfoCard from "../../../../../../components/server/ServerInfoCard"
import MainLayout from "../../../../../../layouts/MainLayout"
import useFetchServerInfo from "../../../../../../hooks/useFetchServerInfo"
import { useParams } from "react-router-dom"
import useFetchProjectInfo from "../../../../../../hooks/useFetchProjectInfo"
import ServerInfoCardLoading from "../../../../../../components/loader/ServerInfoCardLoading"
import { ServerStackIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import PageLoading from "../../../../../../components/loader/PageLoading"
import DeleteServerModal from "../../../../../../components/modal/DeleteServerModal"

const Index = () => {
    const { project: projectId, server: serverId } = useParams()
    const { data: project, isLoading: isProjectLoading } = useFetchProjectInfo(projectId || "0")
    const { data: server, isLoading: isServerLoading } = useFetchServerInfo(projectId || "0", serverId || "0")
    const [activeModal, setActiveModal] = useState(false)
    const projectIdNumber = parseInt(projectId || "", 10)
    if (projectId == null || isNaN(projectIdNumber)) {
        return <div>Error: Invalid project ID</div>
    }

    const serverIdNumber = parseInt(projectId || "", 10)
    if (serverId == null || isNaN(serverIdNumber)) {
        return <PageLoading />
    }

    if (server == null || project == null) {
        return <PageLoading />
    }

    const headerContent = (
        <>
            <div className={"flex w-full justify-between items-start gap-[10px]"}>
                <div>
                    <h2>{project.data.name}</h2>
                    <div className={"flex gap-2 my-2"}>
                        <ServerStackIcon className="w-6" />
                        <h2 className="text-2xl">{server.data.hostname}</h2>
                    </div>
                </div>

                <TrashIcon className="w-6 cursor-pointer" onClick={() => setActiveModal(true)} />
            </div>
        </>
    )

    const bodyContent = (
        <div className="flex gap-5">
            <ServerInfoCard ip={server.data.ip} ram={server.data.memory} storage={server.data.storage} vcpu={server.data.v_cpu} />
            <CredentialCard user={server.data.username} password={server.data.password} />
        </div>
    )
    return (
        <>
            <MainLayout
                headerContent={headerContent}
                bodyContent={
                    isServerLoading || isProjectLoading ? (
                        <div className="flex gap-5">
                            <ServerInfoCardLoading />
                            <ServerInfoCardLoading />
                        </div>
                    ) : (
                        bodyContent
                    )
                }
            />
            {activeModal && <DeleteServerModal onClose={() => setActiveModal(false)} projectId={projectId} serverId={serverId} />}
        </>
    )
}
export default Index
