import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"

export interface CreateProjectModalProps {
    onClose: () => void
}

const ProjectSettingModal: React.FC<CreateProjectModalProps> = ({ onClose }) => {
    const [projectName, setProjectName] = useState("")
    const [projectDomain, setProjectDomain] = useState("")
    const isLoading = false

    const handleCreate = () => {}

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
                <div className="mb-4">
                    <label htmlFor="projectName" className="block text-sm font-medium text-foreground">
                        Edit Project
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        disabled={isLoading}
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
                            disabled={isLoading}
                        ></input>
                        <p className="text-lg">.scnn.me</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button className="px-6" onClick={handleCreate} disabled={isLoading}>
                        {isLoading ? <DotLoading /> : "Create"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectSettingModal
