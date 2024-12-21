import React, { useState } from "react"
import { DotLoading } from "../loader/DotLoading"
import { CreateServerPayload } from "../../types/server"

export interface CreateServerModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (server: CreateServerPayload) => void
    isLoading: boolean
}

const CreateServerModal: React.FC<CreateServerModalProps> = ({ isOpen, onClose, onCreate, isLoading }) => {
    const [server, setServer] = useState<CreateServerPayload>({ hostname: "", username: "", password: "", os: "Debian", v_cpu: 2, memory: 1 })

    const handleCreate = () => {
        if (
            !server.hostname.trim() ||
            !server.username.trim() ||
            !server.password.trim() ||
            !server.os.trim() ||
            !server.v_cpu ||
            !server.memory ||
            server.memory < 1
        ) {
            alert("Please fill in all fields correctly.")
            return
        }
        onCreate(server)
        onClose()
    }
    const handleInputChange = (key: keyof CreateServerPayload, value: string | number) => {
        setServer((prev) => ({
            ...prev,
            [key]: value,
        }))
    }
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Create New Server</h2>
                <div className="mb-4">
                    <label htmlFor="hostname" className="block text-sm font-medium text-foreground">
                        Hostname
                    </label>
                    <input
                        type="text"
                        id="hostname"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={server.hostname}
                        onChange={(e) => handleInputChange("hostname", e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-foreground">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={server.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
                        value={server.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="os" className="block text-sm font-medium text-foreground">
                        OS
                    </label>
                    <select
                        id="os"
                        className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary"
                        value={server.os}
                        onChange={(e) => handleInputChange("os", e.target.value)}
                        disabled={true}
                    >
                        <option value="Debian">Debian</option>
                    </select>
                </div>
                <div className="flex mb-4">
                    <div className=" flex-1">
                        <label htmlFor="v_cpu" className="block text-sm font-medium text-foreground">
                            vCPU
                        </label>
                        <select
                            id="v_cpu"
                            className="mt-1 px-3 block h-[40px]  w-full rounded-md border-2 focus:border-primary"
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
                            Memory
                        </label>
                        <input
                            type="number"
                            id="memory"
                            className="mt-1 block h-[40px] p-3 w-full rounded-md border-2 focus:border-primary"
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

export default CreateServerModal

