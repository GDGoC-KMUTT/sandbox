import { PencilIcon } from "@heroicons/react/24/solid"
const DomainList = () => {
    return (
        <div className="w-full">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="w-[15%] px-4 py-2 text-left border-b-2 border-gray-300">Domain</th>
                        <th className="w-[15%] px-4 py-2 text-left border-b-2 border-gray-300">Type</th>
                        <th className="w-[20%] px-4 py-2 text-left border-b-2 border-gray-300">Target</th>
                        <th className="px-4 py-2 text-left border-b-2 border-gray-300"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2">server</td>
                        <td className="px-4 py-2">A</td>
                        <td className="px-4 py-2">10.2.50.6</td>
                        <td className="flex justify-end p-4 pr-6">
                            <PencilIcon className="h-[20px]" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DomainList
