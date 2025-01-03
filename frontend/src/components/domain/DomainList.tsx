import { PencilIcon, ServerIcon } from "@heroicons/react/24/solid"
import useFetchDomains from "../../hooks/useFetchDomains"
import DomainLoading from "../loader/DomainLoading"
import DomainSettingModal from "../modal/DomainSettingModal"
import { useState } from "react"
import { Domain } from "../../types/domain"
import { TrashIcon } from "@heroicons/react/24/solid"
import DeleteDomainModal from "../modal/DeleteDomainModal"

interface IDomainList {
    projectId: string
    projectDomain: string
}

const ServerTag = ({ hostname }: { hostname: string | null }) => {
    return <div>{hostname || "No server"}</div>
}

const DomainList: React.FC<IDomainList> = ({ projectId, projectDomain }) => {
    const { data: domains, isLoading } = useFetchDomains(projectId)
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [selectedDns, setSelectedDns] = useState<Domain>()
    const handleCloseModal = () => {
        setActiveModal(null)
    }

    if (isLoading) {
        return <DomainLoading />
    }
    if (!domains || !domains.data) {
        return <div className="text-center my-[100px]">No domains available</div>
    }
    return (
        <div className="w-full">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="w-[20%] px-4 py-2 text-left border-b-2 border-gray-300">Domain</th>
                        <th className="w-[15%] px-4 py-2 text-left border-b-2 border-gray-300">Type</th>
                        <th className="w-[30%] px-4 py-2 text-left border-b-2 border-gray-300">Target</th>
                        <th className="px-4 py-2 text-left border-b-2 border-gray-300"></th>
                    </tr>
                </thead>
                <tbody>
                    {domains?.data.map((domain, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">
                                {projectDomain}-{domain.hostname}.scnd.space
                            </td>
                            <td className="px-4 py-2">{domain.dnstype || "*"}</td>
                            {domain.service === "Web Proxy" ? (
                                <td className="px-4 py-2 ">
                                    <span className="inline-block align-middle">
                                        <ServerIcon className="w-[20px]" />
                                    </span>
                                    <span className="inline-block align-middle ml-2">
                                        <ServerTag hostname={domain.server?.hostname || ""} />
                                    </span>
                                </td>
                            ) : (
                                <td className="px-4 py-2">{domain.target}</td>
                            )}

                            <td className="flex justify-end p-4 pr-6">
                                <div className="p-1 mr-6 hover:bg-form rounded-full cursor-pointer">
                                    <TrashIcon
                                        className="h-[20px] w-[20px]"
                                        onClick={() => {
                                            setSelectedDns(domain)
                                            setActiveModal("delete")
                                        }}
                                    />
                                </div>
                                <div className="p-1 hover:bg-form rounded-full cursor-pointer">
                                    <PencilIcon
                                        className="h-[20px] w-[20px]"
                                        onClick={() => {
                                            setSelectedDns(domain)
                                            setActiveModal("edit")
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {activeModal === "edit" && selectedDns && <DomainSettingModal onClose={handleCloseModal} projectId={projectId} domain={selectedDns} />}
            {activeModal === "delete" && selectedDns && (
                <DeleteDomainModal onClose={handleCloseModal} projectId={projectId} domainId={selectedDns.id} />
            )}
        </div>
    )
}

export default DomainList
