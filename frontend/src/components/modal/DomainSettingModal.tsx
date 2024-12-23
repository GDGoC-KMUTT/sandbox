import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import { CreateDomainPayload, Domain, EditDomainPayload } from "../../types/domain"
import { useQueryClient } from "@tanstack/react-query"
import useEditDnsRecord from "../../hooks/useEditDnsRecord"
import useFetchServers from "../../hooks/useFetchServers"
import useEditWebProxy from "../../hooks/useEditWebProxy"

export interface IEditDomainModal {
    onClose: () => void
    projectId: string
    domain: Domain
}

const DomainSettingModal: React.FC<IEditDomainModal> = ({ onClose, projectId, domain }) => {
    const { mutate: editDnsRecord, isPending: isEditDnsRecordPending } = useEditDnsRecord()
    const { mutate: editWebProxy, isPending: isEditWebProxyPending } = useEditWebProxy()

    const { data: servers, isLoading: isFetchServersPending } = useFetchServers(projectId)

    const queryClient = useQueryClient()
    const [domainValue, setDomainValue] = useState<EditDomainPayload>({
        id: domain.id,
        hostname: domain.hostname || "",
        dnstype: domain.dnstype || "A",
        target: domain.target || "",
        server_id: domain.server?.id || 0,
        port: domain.port || 0,
        service: domain.service || "",
    })
    const isAnyPending = isEditDnsRecordPending || isEditWebProxyPending

    const handleInputChange = (key: keyof CreateDomainPayload, value: string | number) => {
        setDomainValue((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleCreate = () => {
        if (domainValue.service == "DNS record") {
            if (!domainValue.hostname.trim() || !domainValue.dnstype.trim() || !domainValue.target.trim()) {
                alert("Please fill in all fields correctly.")
                return
            } else {
                editDnsRecord(
                    {
                        id: domain.id,
                        hostname: domainValue.hostname,
                        dnstype: domainValue.dnstype,
                        target: domainValue.target,
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
        } else if (domainValue.service == "Web Proxy") {
            if (!domainValue.hostname.trim() || domainValue.server_id == 0 || domainValue.port == 0) {
                alert("Please fill in all fields correctly.")
                return
            } else {
                editWebProxy(
                    {
                        id: domain.id,
                        hostname: domainValue.hostname,
                        server_id: domainValue.server_id,
                        port: domainValue.port,
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
                <h2 className="text-xl font-semibold mb-4">Edit DNS</h2>
                <div className="mb-4">
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-foreground">
                        Hostname
                    </label>
                    <div className="flex items-center">
                        <input
                            id="hostname"
                            className="mt-1 mr-2 block h-[40px] p-3 w-[70%] rounded-md border-2 focus:border-primary"
                            value={domainValue.hostname}
                            onChange={(e) => handleInputChange("hostname", e.target.value)}
                            disabled={isAnyPending}
                        ></input>
                        <p className="text-lg">.scnn.me</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="service" className="block text-sm font-medium text-foreground">
                        Service
                    </label>
                    <div className="flex w-full space-x-2">
                        <button
                            onClick={() => handleInputChange("service", "DNS record")}
                            className={`flex-auto p-2 rounded-md ${
                                domainValue.service === "DNS record"
                                    ? "bg-primary text-background"
                                    : "bg-background text-foreground border-2 border-slate-200"
                            }`}
                        >
                            DNS Record
                        </button>
                        <button
                            onClick={() => handleInputChange("service", "Web Proxy")}
                            className={`flex-auto p-2 rounded-md ${
                                domainValue.service === "Web Proxy"
                                    ? "bg-primary text-background"
                                    : "bg-background text-foreground border-2 border-slate-200"
                            }`}
                        >
                            Web Proxy
                        </button>
                    </div>
                </div>
                {domainValue.service === "DNS record" && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="dnstype" className="block text-sm font-medium text-foreground">
                                Type
                            </label>
                            <select
                                id="dnstype"
                                className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary"
                                value={domainValue.dnstype}
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
                                value={domainValue.target}
                                onChange={(e) => handleInputChange("target", e.target.value)}
                                disabled={isAnyPending}
                            />
                        </div>
                    </>
                )}

                {domainValue.service === "Web Proxy" && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="server" className="block text-sm font-medium text-foreground">
                                Server
                            </label>
                            <select
                                id="server_id"
                                className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary"
                                value={domainValue.server_id}
                                onChange={(e) => handleInputChange("server_id", Number(e.target.value))}
                                disabled={isFetchServersPending}
                            >
                                <option value={0} disabled>
                                    Select a server
                                </option>
                                {servers?.data.map((server, index) => (
                                    <option key={index} value={server.id}>
                                        {server.hostname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="port" className="block text-sm font-medium text-foreground">
                                Port
                            </label>
                            <input
                                id="port"
                                type="number"
                                className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                                value={domainValue.port}
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
                        {isAnyPending ? <DotLoading /> : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DomainSettingModal

