import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { UserAvatar } from "../../types/project"
import useFetchProjectInfo from "../../hooks/useFetchProjectInfo"
import useEditProject from "../../hooks/useEditProject"
import { useQueryClient } from "@tanstack/react-query"
import useAddUser from "../../hooks/useAddUser"
import useDeleteUser from "../../hooks/useDeleteUser"
import useFetchUsers from "../../hooks/useFetchUsers"

export interface CreateProjectModalProps {
    projectId: string
    onClose: () => void
}

const ProjectSettingModal: React.FC<CreateProjectModalProps> = ({ onClose, projectId }) => {
    const { data, isLoading, refetch } = useFetchProjectInfo(projectId || "0")
    const { data: users, isLoading: isLoadingUsers, refetch: refetchUsers } = useFetchUsers(projectId)

    const queryClient = useQueryClient()

    const { mutate: editProject, isPending: isEditProject } = useEditProject()
    const { mutate: addUser, isPending: isAddUser } = useAddUser()
    const { mutate: deleteUser, isPending: isDeleteUser } = useDeleteUser()

    const [tab, setTab] = useState("info")
    const [collaborators, setCollaborators] = useState<UserAvatar[]>(data?.data.users || [])
    const [projectName, setProjectName] = useState(data?.data.name || "")
    const [projectDomain, setProjectDomain] = useState(data?.data.domain || "")
    const [newCollaborator, setNewCollaborator] = useState("")

    const projectIdNumber = parseInt(projectId || "", 10)
    if (projectId == null || isNaN(projectIdNumber)) {
        return <div>Error: Invalid project ID</div>
    }
    const handleAddCollaborator = () => {
        const emailExists = collaborators.some((collaborator) => collaborator.email === newCollaborator)
        if (newCollaborator && !emailExists) {
            addUser(
                { email: newCollaborator, project_id: projectIdNumber },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: ["projects", projectId],
                        })
                        refetch()
                        refetchUsers()
                        setCollaborators([...collaborators, { email: newCollaborator, photo_url: "" }]) // ! Will fix this, it should fetch photoUrl from addedUser
                        setNewCollaborator("")
                    },
                    onError: (e) => {
                        alert(e)
                        onClose()
                    },
                }
            )
        } else if (emailExists) {
            alert("This collaborator is already added.")
        }
    }

    const handleRemoveCollaborator = (collaborator: string) => {
        deleteUser(
            { email: collaborator, project_id: projectIdNumber },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["projects", projectId],
                    })
                    refetch()
                    refetchUsers()

                    setCollaborators(collaborators.filter((collab) => collab.email !== collaborator))
                },
                onError: (e) => {
                    alert(e)
                    onClose()
                },
            }
        )
    }

    const handleEdit = () => {
        console.log({
            name: projectName,
            domain: projectDomain,
            project_id: projectIdNumber,
        })
        editProject(
            {
                name: projectName,
                domain: projectDomain,
                project_id: projectIdNumber,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["projects", projectId],
                    })
                    onClose()
                },
                onError: (e) => {
                    alert(e)
                    onClose()
                },
            }
        )
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
                <div className="mb-4">
                    <div className="flex w-full space-x-2">
                        <button
                            onClick={() => setTab("info")}
                            className={`flex-auto p-2 rounded-md ${
                                tab === "info" ? "bg-primary text-background" : "bg-background text-foreground border-2 border-slate-200"
                            }`}
                            disabled={isLoading}
                        >
                            Project Info
                        </button>
                        <button
                            onClick={() => setTab("collab")}
                            className={`flex-auto p-2 rounded-md ${
                                tab === "collab" ? "bg-primary text-background" : "bg-background text-foreground border-2 border-slate-200"
                            }`}
                            disabled={isLoading}
                        >
                            Collaborators
                        </button>
                    </div>
                </div>
                {tab == "info" ? (
                    <>
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
                                disabled={isEditProject}
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
                                    disabled={isEditProject}
                                ></input>
                                <p className="text-lg">.scnn.me</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                                onClick={onClose}
                                disabled={isEditProject}
                            >
                                Cancel
                            </button>
                            <button className="px-6" onClick={handleEdit} disabled={isEditProject}>
                                {isEditProject ? <DotLoading /> : "Save"}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="mb-4">
                        <label htmlFor="collaborators" className="block text-sm font-medium text-foreground">
                            Collaborator
                        </label>
                        <div className="flex items-center mb-2">
                            {/* <input
                                type="text"
                                id="collaborators"
                                className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                                value={newCollaborator}
                                onChange={(e) => setNewCollaborator(e.target.value)}
                                disabled={isEditProject}
                                placeholder="type email here"
                            /> */}
                            <select
                                id="collaborators"
                                value={newCollaborator}
                                onChange={(e) => setNewCollaborator(e.target.value)}
                                disabled={isLoadingUsers}
                                className="mt-1 block h-[40px] px-3 w-full rounded-md border-2 focus:border-primary"
                            >
                                <option>Select user to add</option>
                                {users?.data.map((user, index) => {
                                    return (
                                        <option key={index} value={user.email} className="flex items-center space-x-2">
                                            {user.email}
                                        </option>
                                    )
                                })}
                            </select>
                            <button
                                onClick={handleAddCollaborator}
                                className="ml-2 px-3 py-1 bg-primary text-white rounded-md"
                                disabled={isAddUser || isDeleteUser}
                            >
                                Invite
                            </button>
                        </div>
                        <ul className="space-y-1 mt-4">
                            {collaborators?.map((collaborator, index) => (
                                <li key={index} className="flex items-center justify-between bg-background rounded-md p-1">
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={collaborator.photo_url || ""}
                                            alt={collaborator.email}
                                            className={`w-[30px] h-[30px] rounded-full object-cover  ${index !== 0 ? "-ml-2" : ""}`}
                                        />
                                        <p className="text-sm font-medium">{collaborator.email}</p>
                                    </div>

                                    <div className="cursor-pointer hover:bg-form rounded-full p-1">
                                        <XMarkIcon width={"20px"} height={"20px"} onClick={() => handleRemoveCollaborator(collaborator.email)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectSettingModal

