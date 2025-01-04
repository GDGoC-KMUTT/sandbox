import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import { CreateServerPayload } from "../../types/server"
import useCreateServer from "../../hooks/useCreateServer"
import { toast } from "sonner"

export interface ICreateServerModal {
    onClose: () => void
    projectId: string
}

const CreateServerModal: React.FC<ICreateServerModal> = ({ onClose, projectId }) => {
    const { mutate: createServer, isPending } = useCreateServer()
    const [server, setServer] = useState<CreateServerPayload>({
        hostname: "",
        username: "root",
        password: "",
        os: "Debian",
        v_cpu: 2,
        memory: 2048,
        storage: 10,
    })

    const validateInput = () => {
        if (!server.hostname.trim()) {
            toast.warning("Hostname is required")
            return false
        }
        if (!server.username.trim()) {
            toast.warning("Username is required")
            return false
        }
        if (!server.password.trim()) {
            toast.warning("Password is required")
            return false
        }
        if (!server.os.trim()) {
            toast.warning("Operating System selection is required")
            return false
        }
        if (!server.v_cpu || server.v_cpu < 1) {
            toast.warning("vCPU must be at least 1")
            return false
        }
        if (!server.memory || server.memory < 1) {
            toast.warning("Memory must be at least 1 MB")
            return false
        }
        if (!server.storage || server.storage < 1) {
            toast.warning("Storage must be at least 1 GB")
            return false
        }
        return true
    }
    const handleCreate = () => {
        if (!validateInput()) return

        createServer(
            {
                ...server,
                projectId: projectId,
            },
            {
                onSettled: onClose,
            }
        )
    }

    const handleInputChange = (key: keyof CreateServerPayload, value: string | number) => {
        setServer((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Create New Server</h2>
                <div className="mb-4">
                    <label htmlFor="hostname" className="block text-sm font-medium text-foreground">
                        Hostname
                    </label>
                    <input
                        type="text"
                        id="hostname"
                        maxLength={30}
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={server.hostname}
                        onChange={(e) => handleInputChange("hostname", e.target.value)}
                        disabled={isPending}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-foreground">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary cursor-not-allowed opacity-50"
                        value={server.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        disabled={true}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        maxLength={30}
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={server.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        disabled={isPending}
                    />
                </div>
                <div className="flex mb-4">
                    <div className="flex-1">
                        {" "}
                        <label htmlFor="os" className="block text-sm font-medium text-foreground">
                            OS
                        </label>
                        <select
                            id="os"
                            className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary cursor-not-allowed opacity-50"
                            value={server.os}
                            onChange={(e) => handleInputChange("os", e.target.value)}
                            disabled={true}
                        >
                            <option value="Debian">Debian</option>
                        </select>
                    </div>
                    <div className="w-4"></div>

                    <div className="flex-1">
                        <label htmlFor="storage" className="block text-sm font-medium text-foreground">
                            Storage (GB)
                        </label>
                        <input
                            type="number"
                            id="storage"
                            className="mt-1 block h-[40px] w-full p-3 rounded-md border-2 focus:border-primary cursor-not-allowed opacity-50"
                            value={server.storage}
                            onChange={(e) => handleInputChange("storage", e.target.value)}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className=" flex-1">
                        <label htmlFor="v_cpu" className="block text-sm font-medium text-foreground">
                            vCPU
                        </label>
                        <select
                            id="v_cpu"
                            className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary cursor-not-allowed opacity-50"
                            value={server.v_cpu}
                            onChange={(e) => handleInputChange("v_cpu", e.target.value)}
                            disabled={true}
                        >
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div className="w-4"></div>
                    <div className=" flex-1">
                        <label htmlFor="memory" className="block text-sm font-medium text-foreground">
                            Memory (MB)
                        </label>
                        <input
                            type="number"
                            id="memory"
                            className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary   cursor-not-allowed opacity-50"
                            value={server.memory}
                            onChange={(e) => handleInputChange("memory", e.target.value)}
                            disabled={true}
                        />
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

export default CreateServerModal

