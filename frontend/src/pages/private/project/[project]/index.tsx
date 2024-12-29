import { useState } from "react"
import { useParams } from "react-router-dom"
import DomainList from "../../../../components/domain/DomainList"
import ServerList from "../../../../components/server/ServerList"
import Tabs from "../../../../components/ui/Tabs"
import MainLayout from "../../../../layouts/MainLayout"
import AvatarList from "../../../../components/ui/AvatarList"
import CreateServerModal from "../../../../components/modal/CreateServerModal"
import CreateDomainModal from "../../../../components/modal/CreateDomainModal"
import useFetchProjectInfo from "../../../../hooks/useFetchProjectInfo"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import ProjectSettingModal from "../../../../components/modal/ProjectSettingModal"
import TabBodyLoading from "../../../../components/loader/TabBodyLoading"
import ProjectHeaderLoading from "../../../../components/loader/ProjectHeaderLoading"
import { TrashIcon } from "@heroicons/react/24/solid"
import DeleteProjectModal from "../../../../components/modal/DeleteProjectModal"

const Index = () => {
    const { project: projectId } = useParams()
    const { data, isLoading } = useFetchProjectInfo(projectId || "0")
    const [activeModal, setActiveModal] = useState<"server" | "domain" | "setting" | "deleteProject" | null>(null)

    const projectIdNumber = parseInt(projectId || "", 10)
    if (projectId == null || isNaN(projectIdNumber)) {
        return <div>Error: Invalid project ID</div>
    }

    const tabs = [
        {
            label: "Server",
            content: <ServerList projectId={projectId} />,
            newFunction: () => setActiveModal("server"),
        },
        {
            label: "DNS Manager",
            content: <DomainList projectId={projectId} projectDomain={data?.data.domain || ""} />,
            newFunction: () => setActiveModal("domain"),
        },
    ]

    const handleCloseModal = () => {
        setActiveModal(null)
    }

    const users = data?.data.users || []
    const headerContent = isLoading ? (
        <ProjectHeaderLoading />
    ) : (
        <>
            <div className={"flex flex-col gap-[10px]"}>
                <h2>{data?.data.name}</h2>
                <div className={"flex gap-2"}>
                    <h3>{data?.data.domain}</h3>
                </div>
            </div>
            <div className="flex h-full justify-end items-center">
                <AvatarList users={users} position="rb" />
                <div className="ml-[15px]">
                    <TrashIcon className="w-6 cursor-pointer" onClick={() => setActiveModal("deleteProject")} />
                </div>
                <div className="ml-[15px]">
                    <Cog6ToothIcon className="w-7 cursor-pointer" onClick={() => setActiveModal("setting")} />
                </div>
            </div>
        </>
    )

    const bodyContent = isLoading ? <TabBodyLoading tabs={tabs} defaultTab={0} /> : <Tabs tabs={tabs} defaultTab={0} />
    return (
        <>
            <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
            {activeModal === "server" && <CreateServerModal projectId={projectId} onClose={handleCloseModal} />}
            {activeModal === "domain" && <CreateDomainModal projectId={projectId} onClose={handleCloseModal} />}
            {activeModal === "setting" && <ProjectSettingModal projectId={projectId} onClose={handleCloseModal} />}
            {activeModal === "deleteProject" && <DeleteProjectModal projectId={projectId} onClose={handleCloseModal} />}
        </>
    )
}

export default Index
