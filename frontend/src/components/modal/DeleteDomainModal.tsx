import React from "react"
import { DotLoading } from "../loader/DotLoading"
import { useNavigate } from "react-router-dom"
import useDeleteDomain from "../../hooks/useDeleteDomain"

interface IDeleteModal {
    onClose: () => void
    domainId: number
    projectId: string
}

const DeleteDomainModal: React.FC<IDeleteModal> = ({ onClose, domainId, projectId }) => {
    const { mutate: deleteDomain, isPending } = useDeleteDomain()
    const navigate = useNavigate()
    const handleDelete = () => {
        deleteDomain(
            {
                projectId: projectId,
                domainId: domainId,
            },
            {
                onSettled: () => {
                    onClose()
                    navigate(`/project/${projectId}`)
                },
            }
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4"> Delete Domain</h2>

                <p className="text-lg">Are you sure you want to delete this domain?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button className="px-6 text-white bg-red-400 hover:bg-red-600" onClick={handleDelete} disabled={isPending}>
                        {isPending ? <DotLoading /> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDomainModal

