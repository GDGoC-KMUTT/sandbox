import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import { CreateServerPayload, EditServerPayload } from "../../types/server"
import { useQueryClient } from "@tanstack/react-query"
import { TrashIcon } from "@heroicons/react/24/solid"
import useFetchServerInfo from "../../hooks/useFetchServerInfo"
import useEditServer from "../../hooks/useEditServer"

export interface IServerSettingModal {
    onClose: () => void
    projectId: string
    serverId: string
}

const ServerSettingModal: React.FC<IServerSettingModal> = ({ onClose, projectId, serverId }) => {
    const { mutate: editServer, isPending } = useEditServer()
    const { data: server, isLoading: isServerLoading } = useFetchServerInfo(projectId || "0", serverId || "0")

    const [serverValue, setServerValue] = useState<EditServerPayload>({
        projectId: projectId,
        hostname: server?.data.hostname || "",
        serverId: serverId,
    })
    const queryClient = useQueryClient()
    const isAnyPending = isPending || isServerLoading

    const handleEdit = () => {
        editServer(
            {
                projectId: projectId,
                hostname: serverValue.hostname,
                serverId: serverId,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["servers", projectId],
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

    const handleInputChange = (key: keyof CreateServerPayload, value: string | number) => {
        setServerValue((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center first-letter:mb-4">
                    <h2 className="text-xl font-semibold ">Edit Server</h2>

                    <TrashIcon className="w-6 " />
                </div>

                <div className="mb-8">
                    <label htmlFor="hostname" className="block text-sm font-medium text-foreground">
                        Hostname
                    </label>
                    <input
                        type="text"
                        id="hostname"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={serverValue.hostname}
                        onChange={(e) => handleInputChange("hostname", e.target.value)}
                        disabled={isAnyPending}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                        disabled={isAnyPending}
                    >
                        Cancel
                    </button>
                    <button className="px-6" onClick={handleEdit} disabled={isPending}>
                        {isAnyPending ? <DotLoading /> : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServerSettingModal

