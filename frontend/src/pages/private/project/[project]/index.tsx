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
import CreateDomainModal from "../../../../components/modal/CreateDomainModal"
import { CreateDomainPayload } from "../../../../types/domain"
import useCreateDnsRecord from "../../../../hooks/useCreateDnsRecord"
import useCreateWebProxy from "../../../../hooks/useCreateWebProxy"

const Index = () => {
    const { project: projectId } = useParams()
    const { data, isLoading, refetch } = useFetchProjectInfo(projectId || "0")
    const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false)
    const [isCreateDomainModalOpen, setIsCreateDomainModalOpen] = useState(false)
    const { mutate: createServer, isPending: isCreateServerPending } = useCreateServer()
    const { mutate: createDnsRecord, isPending: isCreateDnsRecordPending } = useCreateDnsRecord()
    const { mutate: createWebProxy, isPending: isCreateWebProxyPending } = useCreateWebProxy()
    const isAnyPending = isCreateDnsRecordPending || isCreateWebProxyPending

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
            newFunction: () => setIsCreateDomainModalOpen(true),
        },
    ]

    const handleCreateServer = (server: CreateServerPayload) => {
        createServer(
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

    const handleCreateDomain = (domain: CreateDomainPayload) => {
        if (domain.service == "dns") {
            createDnsRecord(
                {
                    hostname: domain.hostname,
                    dnstype: domain.dnstype,
                    target: domain.target,
                    projectId: projectId,
                },
                {
                    onSuccess: () => {
                        setIsCreateDomainModalOpen(false)
                        refetch()
                    },
                    onError: () => {
                        setIsCreateDomainModalOpen(false)
                    },
                }
            )
        } else if (domain.service == "webProxy") {
            const portNumber = parseInt(domain.port.toString(), 10)
            const serverNumber = parseInt(domain.server_id.toString(), 10)
            if (isNaN(portNumber) || isNaN(serverNumber)) {
                alert("Invalid port or server number")
                return
            }
            createWebProxy(
                {
                    hostname: domain.hostname,
                    server_id: serverNumber,
                    port: portNumber,
                    projectId: projectId,
                },
                {
                    onSuccess: () => {
                        setIsCreateDomainModalOpen(false)
                        refetch()
                    },
                    onError: () => {
                        setIsCreateDomainModalOpen(false)
                    },
                }
            )
        } else {
            console.log("Wrong service type")
        }
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
                    isLoading={isCreateServerPending}
                />
            )}
            {isCreateDomainModalOpen && (
                <CreateDomainModal
                    isOpen={isCreateDomainModalOpen}
                    onClose={() => setIsCreateDomainModalOpen(false)}
                    onCreate={handleCreateDomain}
                    isLoading={isAnyPending}
                />
            )}
        </>
    )
}

export default Index
