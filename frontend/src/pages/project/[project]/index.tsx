import ActiveStatus from "../../../components/ui/ActiveStatus"
import DomainList from "../../../components/domain/DomainList"
import ServerList from "../../../components/server/ServerList"
import Tabs from "../../../components/ui/Tabs"
import MainLayout from "../../../layouts/MainLayout"

const index = () => {
    const tabs = [
        {
            label: "Server",
            content: <ServerList />,
            newFunction: () => console.log("Server"),
        },
        {
            label: "DNS Manager",
            content: <DomainList />,
            newFunction: () => console.log("DNS manager"),
        },
    ]
    const headerContent = (
        <>
            <div className={"flex flex-col gap-[10px]"}>
                <h2>Etalert</h2>
                <div className={"flex gap-2"}>
                    <ActiveStatus status={true} />
                    <h3>domain</h3>
                </div>
            </div>
            <div className="flex h-full justify-end">
                <div>Avartar list</div>
                <div>Setting</div>
            </div>
        </>
    )

    const bodyContent = <Tabs tabs={tabs} defaultTab={0} />
    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}

export default index
