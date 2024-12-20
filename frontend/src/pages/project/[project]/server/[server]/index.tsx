import ActiveStatus from "../../../../../components/ui/ActiveStatus"
import CredentialCard from "../../../../../components/server/CredentialCard"
import ServerInfoCard from "../../../../../components/server/ServerInfoCard"
import MainLayout from "../../../../../layouts/MainLayout"

const index = () => {
    const serverInfo = {
        vcpu: 4,
        ram: 2, // in GB
        storage: 500, // in MB
        ip: "10.2.50.8",
    }

    const credential = {
        user: "root",
        password: "abcdef1234",
    }
    const headerContent = (
        <>
            <div className={"flex flex-col gap-[10px]"}>
                <h2>Etalert</h2>
                <div className={"flex gap-2"}>
                    <ActiveStatus status={true} />
                    <h3>Eta Server</h3>
                </div>
            </div>
            <div className="flex h-full justify-end">
                <div>Avartar list</div>
                <div>Setting</div>
            </div>
        </>
    )

    const bodyContent = (
        <div className="flex gap-5">
            <ServerInfoCard {...serverInfo} />
            <CredentialCard {...credential} />
        </div>
    )
    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}
export default index
