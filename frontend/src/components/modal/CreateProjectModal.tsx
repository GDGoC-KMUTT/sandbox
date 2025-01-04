import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import useCreateProject from "../../hooks/useCreateProject"
import { CreateProjectPayload } from "../../types/project"
import { toast } from "sonner"

export interface CreateProjectModalProps {
    onClose: () => void
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose }) => {
    const { mutate: createProject, isPending } = useCreateProject()
    const [project, setProject] = useState<CreateProjectPayload>({ name: "", domain: "" })

    const handleInputChange = (key: string, value: string | number) => {
        setProject((prev) => ({
            ...prev,
            [key]: value,
        }))
    }
    const validateInputs = (): boolean => {
        if (!project.name.trim()) {
            toast.error("Project name is required.")
            return false
        }
        if (project.name.length < 3) {
            toast.error("Project name must be at least 3 characters long.")
            return false
        }
        if (!project.domain.trim()) {
            toast.error("Domain name is required.")
            return false
        }
        if (!/^[a-zA-Z0-9-]+$/.test(project.domain)) {
            toast.error("Domain name can only contain letters, numbers, and dashes.")
            return false
        }
        return true
    }
    const handleCreate = () => {
        if (validateInputs()) {
            createProject({ name: project.name, domain: project.domain }, { onSettled: onClose })
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                <div className="mb-4">
                    <label htmlFor="projectName" className="block text-sm font-medium text-foreground">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={project.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={isPending}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-foreground">
                        Domain Name
                    </label>
                    <div className="flex items-center">
                        <input
                            id="domain"
                            className="mt-1 mr-2 block h-[40px] p-3 w-[50%] rounded-md border-2 focus:border-primary"
                            value={project.domain}
                            onChange={(e) => handleInputChange("domain", e.target.value)}
                            disabled={isPending}
                        ></input>
                        <p className="text-lg">.scnd.space</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button className="px-6" onClick={handleCreate} disabled={isPending}>
                        {isPending ? <DotLoading /> : "Create"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal

