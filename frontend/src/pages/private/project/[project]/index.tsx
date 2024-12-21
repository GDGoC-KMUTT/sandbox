import { useParams } from "react-router-dom"
import DomainList from "../../../../components/domain/DomainList"
import ServerList from "../../../../components/server/ServerList"
import Tabs from "../../../../components/ui/Tabs"
import MainLayout from "../../../../layouts/MainLayout"
import useFetchProjectInfo from "../../../../hooks/useFetchProjectInfo"
import AvatarList from "../../../../components/ui/AvatarList"
import { IoMdSettings } from "react-icons/io"
import { useState } from "react"
import CreateServerModal from "../../../../components/modal/CreateServerModal"
import { CreateServerPayload } from "../../../../types/server"
import useCreateServer from "../../../../hooks/useCreateServer"

const Index = () => {
    const { project: projectId } = useParams()
    const { data, isLoading, refetch } = useFetchProjectInfo(projectId || "0")
    const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false)
    // const [isCreateDNSModalOpen, setIsCreateDNSModalOpen] = useState(false)
    const { mutate, isPending } = useCreateServer()

    const projectIdNumber = parseInt(projectId || "", 10)
    if (projectId == null || isNaN(projectIdNumber)) {
        return <div>Error: Invalid project ID</div>
    }

    const tabs = [
        {
            label: "Server",
            content: <ServerList projectId={projectId} />,
            newFunction: () => setIsCreateServerModalOpen(true),
        },
        {
            label: "DNS Manager",
            content: <DomainList />,
            newFunction: () => "",
        },
    ]

    const handleCreateServer = (server: CreateServerPayload) => {
        mutate(
            {
                hostname: server.hostname,
                username: server.username,
                password: server.password,
                os: server.os,
                v_cpu: server.v_cpu,
                memory: server.memory,
                projectId: projectId,
            },
            {
                onSuccess: () => {
                    setIsCreateServerModalOpen(false)
                    refetch()
                },
                onError: () => {
                    setIsCreateServerModalOpen(false)
                },
            }
        )
    }

    if (isLoading) {
        return <div>project loading</div>
    }
    const users = data?.data.users || []
    const headerContent = (
        <>
            <div className={"flex flex-col gap-[10px]"}>
                <h2>{data?.data.name}</h2>
                <div className={"flex gap-2"}>
                    <h3>{data?.data.domain}</h3>
                </div>
            </div>
            <div className="flex h-full justify-end items-center">
                <AvatarList users={users} />
                <div className="ml-[20px]">
                    <IoMdSettings size={"20px"} className="cursor-pointer" />
                </div>
            </div>
        </>
    )

    const bodyContent = <Tabs tabs={tabs} defaultTab={0} />
    return (
        <>
            <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
            {isCreateServerModalOpen && (
                <CreateServerModal
                    isOpen={isCreateServerModalOpen}
                    onClose={() => setIsCreateServerModalOpen(false)}
                    onCreate={handleCreateServer}
                    isLoading={isPending}
                />
            )}
            {/* {isCreateDNSModalOpen && (
                <CreateDNSModal isOpen={isCreateDNSModalOpen} onClose={() => setIsCreateDNSModalOpen(false)} projectId={projectId} />
            )} */}
        </>
    )
}

export default Index
