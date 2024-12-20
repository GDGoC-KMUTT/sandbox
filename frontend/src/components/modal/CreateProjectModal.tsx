import React, { useState } from "react"

export interface CreateProjectModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (projectName: string, projectDescription: string) => void
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [projectName, setProjectName] = useState("")
    const [projectDomain, setProjectDomain] = useState("")

    const handleCreate = () => {
        if (projectName.trim() && projectDomain.trim()) {
            onCreate(projectName, projectDomain)
            onClose()
        } else {
            alert("Please fill in both fields.")
        }
    }

    if (!isOpen) return null
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose} // Close modal on background click
        >
            <div className="bg-white rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                <div className="mb-4">
                    <label htmlFor="projectName" className="block text-sm font-medium text-foreground">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-foreground">
                        Domain Name
                    </label>
                    <div className="flex items-center">
                        <input
                            id="projectDescription"
                            className="mt-1 mr-2 block h-[40px] p-3 w-[50%] rounded-md border-2 focus:border-primary"
                            value={projectDomain}
                            onChange={(e) => setProjectDomain(e.target.value)}
                        ></input>
                        <p className="text-lg">.scnn.me</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="px-6" onClick={handleCreate}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal

