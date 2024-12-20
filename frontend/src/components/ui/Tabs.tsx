import { useState } from "react"

type Tab = {
    label: string
    content: JSX.Element
    newFunction: () => void
}

interface TabsProps {
    tabs: Tab[]
    defaultTab?: number
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
    const [activeTab, setActiveTab] = useState(defaultTab)

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
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <button onClick={tabs[activeTab]?.newFunction}>+ New</button>
            </div>

            <div className="p-4">{tabs[activeTab]?.content}</div>
        </div>
    )
}

export default Tabs
