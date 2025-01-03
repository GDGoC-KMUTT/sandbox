import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import { CreateDomainPayload } from "../../types/domain"
import useCreateDnsRecord from "../../hooks/useCreateDnsRecord"
import useCreateWebProxy from "../../hooks/useCreateWebProxy"
import { useQueryClient } from "@tanstack/react-query"
import useFetchServers from "../../hooks/useFetchServers"
import useFetchProjectInfo from "../../hooks/useFetchProjectInfo"

export interface ICreateDomainModal {
    onClose: () => void
    projectId: string
}

const CreateDomainModal: React.FC<ICreateDomainModal> = ({ onClose, projectId }) => {
    const { mutate: createDnsRecord, isPending: isCreateDnsRecordPending } = useCreateDnsRecord()
    const { mutate: createWebProxy, isPending: isCreateWebProxyPending } = useCreateWebProxy()
    const { data: servers, isLoading: isFetchServersPending } = useFetchServers(projectId)
    const { data: project, isLoading: isFetchProjectPending } = useFetchProjectInfo(projectId)
    const [domain, setDomain] = useState<CreateDomainPayload>({
        hostname: "",
        dnstype: "A",
        target: "",
        server_id: 0,
        port: 0,
        service: "dns",
    })
    const queryClient = useQueryClient()

    if (isFetchServersPending) {
        return (
            <div>
                <DotLoading />
            </div>
        )
    }

    const isAnyPending = isCreateDnsRecordPending || isCreateWebProxyPending || isFetchProjectPending

    const handleInputChange = (key: keyof CreateDomainPayload, value: string | number) => {
        setDomain((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleCreate = () => {
        if (domain.service == "dns") {
            if (!domain.hostname.trim() || !domain.dnstype.trim() || !domain.target.trim()) {
                alert("Please fill in all fields correctly.")
                return
            } else {
                createDnsRecord(
                    {
                        hostname: domain.hostname,
                        dnstype: domain.dnstype,
                        target: domain.target,
                        projectId: projectId,
                    },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: ["domains", projectId],
                            })
                            onClose()
                        },
                        onError: (e) => {
                            alert(e)
                        },
                    }
                )
            }
        } else if (domain.service == "webProxy") {
            if (!domain.hostname.trim() || domain.server_id == 0 || domain.port == 0) {
                alert("Please fill in all fields correctly.")
                return
            } else {
                const server_id = Number(domain.server_id)
                const port = Number(domain.port)

                if (isNaN(server_id) || isNaN(port)) {
                    throw new Error("Invalid server_id or port")
                }

                createWebProxy(
                    {
                        hostname: domain.hostname,
                        server_id,
                        port,
                        projectId: projectId,
                    },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: ["domains", projectId],
                            })
                            onClose()
                        },
                        onError: (e) => {
                            alert(e)
                        },
                    }
                )
            }
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Create New DNS</h2>
                <div className="mb-4">
                    <label htmlFor="hostname" className="block text-sm font-medium text-foreground">
                        Hostname
                    </label>
                    <div className="flex items-center">
                        <p className="text-lg mr-1">{project?.data.domain}- </p>
                        <input
                            id="hostname"
                            className="mt-1 mr-2 block h-[40px] p-3 w-[70%] rounded-md border-2 focus:border-primary"
                            value={domain.hostname}
                            onChange={(e) => handleInputChange("hostname", e.target.value)}
                            disabled={isAnyPending}
                        ></input>
                        <p className="text-lg">.scnd.space</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="service" className="block text-sm font-medium text-foreground">
                        Service
                    </label>
                    <div className="flex w-full space-x-2">
                        <button
                            onClick={() => handleInputChange("service", "dns")}
                            className={`flex-auto p-2 rounded-md ${
                                domain.service === "dns" ? "bg-primary text-background" : "bg-background text-foreground border-2 border-slate-200"
                            }`}
                        >
                            DNS Record
                        </button>
                        <button
                            onClick={() => handleInputChange("service", "webProxy")}
                            className={`flex-auto p-2 rounded-md ${
                                domain.service === "webProxy"
                                    ? "bg-primary text-background"
                                    : "bg-background text-foreground border-2 border-slate-200"
                            }`}
                        >
                            Web Proxy
                        </button>
                    </div>
                </div>
                {domain.service === "dns" && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="dnstype" className="block text-sm font-medium text-foreground">
                                Type
                            </label>
                            <select
                                id="dnstype"
                                className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary"
                                value={domain.dnstype}
                                onChange={(e) => handleInputChange("dnstype", e.target.value)}
                                disabled={isAnyPending}
                            >
                                <option value="A">A</option>
                                <option value="CNAME">CNAME</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="target" className="block text-sm font-medium text-foreground">
                                Target
                            </label>
                            <input
                                id="target"
                                className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                                value={domain.target}
                                onChange={(e) => handleInputChange("target", e.target.value)}
                                disabled={isAnyPending}
                            />
                        </div>
                    </>
                )}

                {domain.service === "webProxy" && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="server" className="block text-sm font-medium text-foreground">
                                Server
                            </label>
                            {servers && servers.data && servers.data.length > 0 ? (
                                <select
                                    id="server_id"
                                    className="mt-1 px-3 block h-[40px] w-full rounded-md border-2 focus:border-primary"
                                    value={domain.server_id}
                                    onChange={(e) => handleInputChange("server_id", Number(e.target.value))}
                                    disabled={isFetchServersPending}
                                >
                                    <option value={0} disabled>
                                        Select a server
                                    </option>
                                    {servers.data.map((server, index) => (
                                        <option key={index} value={server.id}>
                                            {server.hostname}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <select
                                    id="server_id"
                                    className="mt-1 px-3 block h-[40px] w-full rounded-md border-2 focus:border-primary"
                                    value={domain.server_id}
                                    onChange={(e) => handleInputChange("server_id", Number(e.target.value))}
                                    disabled={isFetchServersPending}
                                >
                                    <option value={0} disabled>
                                        No available servers in project
                                    </option>{" "}
                                </select>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="port" className="block text-sm font-medium text-foreground">
                                Port
                            </label>
                            <input
                                id="port"
                                type="number"
                                className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                                value={domain.port}
                                onChange={(e) => handleInputChange("port", Number(e.target.value))}
                                disabled={isAnyPending}
                                max={65535}
                            />
                        </div>
                    </>
                )}
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                        disabled={isAnyPending}
                    >
                        Cancel
                    </button>
                    <button className="px-6" onClick={handleCreate} disabled={isAnyPending}>
                        {isAnyPending ? <DotLoading /> : "Create"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateDomainModal

