import ServerCard from "./ServerCard"

const ServerList = () => {
    const servers = [
        {
            id: 1,
            hostname: "Server One",
            ip: "192.168.1.1",
            status: true,
            vcpu: 4,
            memory: 16,
        },
        {
            id: 2,
            hostname: "Server Two",
            ip: "192.168.1.2",
            status: false,
            vcpu: 2,
            memory: 8,
        },
        {
            id: 3,
            hostname: "Server Three",
            ip: "192.168.1.3",
            status: true,
            vcpu: 8,
            memory: 32,
        },
        {
            id: 4,
            hostname: "Server One",
            ip: "192.168.1.1",
            status: true,
            vcpu: 4,
            memory: 16,
        },
        {
            id: 5,
            hostname: "Server Two",
            ip: "192.168.1.2",
            status: false,
            vcpu: 2,
            memory: 8,
        },
        {
            id: 6,
            hostname: "Server Three",
            ip: "192.168.1.3",
            status: true,
            vcpu: 8,
            memory: 32,
        },
        {
            id: 7,
            hostname: "Server One",
            ip: "192.168.1.1",
            status: true,
            vcpu: 4,
            memory: 16,
        },
        {
            id: 8,
            hostname: "Server Two",
            ip: "192.168.1.2",
            status: false,
            vcpu: 2,
            memory: 8,
        },
        {
            id: 9,
            hostname: "Server Three",
            ip: "192.168.1.3",
            status: true,
            vcpu: 8,
            memory: 32,
        },
    ]
    return (
        <>
            <div className="flex flex-wrap">
                {servers.map((server) => (
                    <ServerCard {...server} key={server.id} />
                ))}
            </div>
        </>
    )
}

export default ServerList
