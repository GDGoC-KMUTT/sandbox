import { useParams } from "react-router-dom"
import DomainList from "../../../../components/domain/DomainList"
import ServerList from "../../../../components/server/ServerList"
import Tabs from "../../../../components/ui/Tabs"
import MainLayout from "../../../../layouts/MainLayout"
import useFetchProjectInfo from "../../../../hooks/useFetchProjectInfo"
import AvatarList from "../../../../components/ui/AvatarList"

const Index = () => {
    const { project: projectId } = useParams()
    const { data, isLoading } = useFetchProjectInfo(projectId || "0")

    const projectIdNumber = parseInt(projectId || "", 10)
    if (projectId == null || isNaN(projectIdNumber)) {
        return <div>Error: Invalid project ID</div>
    }

    const tabs = [
        {
            label: "Server",
            content: <ServerList projectId={projectId} />,
            newFunction: () => console.log("Server"),
        },
        {
            label: "DNS Manager",
            content: <DomainList />,
            newFunction: () => console.log("DNS manager"),
        },
    ]

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
            <div className="flex h-full justify-end">
                <AvatarList users={users} />
                <div>Setting</div>
            </div>
        </>
    )

    const bodyContent = <Tabs tabs={tabs} defaultTab={0} />
    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}

export default Index
