import { PencilIcon } from "@heroicons/react/24/solid"
import useFetchDomains from "../../hooks/useFetchDomains"
import DomainLoading from "../loader/DomainLoading"
import DomainSettingModal from "../modal/DomainSettingModal"
import { useState } from "react"
import { Domain } from "../../types/domain"

interface IDomainList {
    projectId: string
}

const ServerTag = ({ hostname }: { hostname: string | null }) => {
    return <div>{hostname || "No server"}</div>
}

const DomainList: React.FC<IDomainList> = ({ projectId }) => {
    const { data: domains, isLoading } = useFetchDomains(projectId)
    const [activeModal, setActiveModal] = useState<"dns" | "webproxy" | null>(null)
    const [selectedDns, setSelectedDns] = useState<Domain>()
    const handleCloseModal = () => {
        setActiveModal(null)
    }

    if (isLoading) {
        return <DomainLoading />
    }
    if (!domains || !domains.data) {
        return <div>No domains available</div>
    }
    return (
        <div className="w-full">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="w-[15%] px-4 py-2 text-left border-b-2 border-gray-300">Domain</th>
                        <th className="w-[15%] px-4 py-2 text-left border-b-2 border-gray-300">Type</th>
                        <th className="w-[20%] px-4 py-2 text-left border-b-2 border-gray-300">Target</th>
                        <th className="px-4 py-2 text-left border-b-2 border-gray-300"></th>
                    </tr>
                </thead>
                <tbody>
                    {domains?.data.map((domain, index) => (
                        <tr
                            key={index}
                            onClick={() => {
                                setSelectedDns(domain)
                                setActiveModal("dns")
                            }}
                        >
                            <td className="px-4 py-2">{domain.hostname}</td>
                            <td className="px-4 py-2">{domain.dnstype || "*"}</td>
                            {domain.service === "Web Proxy" ? (
                                <>
                                    <td className="px-4 py-2">
                                        <ServerTag hostname={domain.server?.hostname || ""} />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-2">10.2.50.6</td>
                                </>
                            )}
                            <td className="flex justify-end p-4 pr-6">
                                <div className="p-1 hover:bg-form rounded-full cursor-pointer">
                                    <PencilIcon className="h-[20px] w-[20px]" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {activeModal === "dns" && selectedDns && <DomainSettingModal onClose={handleCloseModal} projectId={projectId} domain={selectedDns} />}
            {/* {activeModal === "webproxy" && selectedDns && (
                <WebProxySettingModal onClose={handleCloseModal} projectId={projectId} domain={selectedDns} />
            )} */}
        </div>
    )
}

export default DomainList
