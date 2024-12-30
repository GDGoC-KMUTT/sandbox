import { useState } from "react"
import ServerCardLoading from "./ServerCardLoading"

type Tab = {
    label: string
    content: JSX.Element
    newFunction: () => void
}

interface TabsProps {
    tabs: Tab[]
    defaultTab?: number
}

const TabBodyLoading: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
    const [activeTab] = useState(defaultTab)

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between">
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 text-lg font-medium w-fit focus:outline-none cursor-pointer ${
                                activeTab === index ? "border-b-2 border-primary" : "hover:text-blue-500"
                            }`}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <button onClick={tabs[activeTab]?.newFunction}>+ New</button>
            </div>

            <div className="p-4 flex flex-wrap">
                <ServerCardLoading />
                <ServerCardLoading />
                <ServerCardLoading />
                <ServerCardLoading />
            </div>
        </div>
    )
}

export default TabBodyLoading

