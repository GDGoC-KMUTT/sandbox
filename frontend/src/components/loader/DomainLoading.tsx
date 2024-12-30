import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const DomainLoading = () => {
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
                        <td className="px-4 py-2">
                            <Skeleton width={"140px"} />
                        </td>
                        <td className="px-4 py-2">
                            <Skeleton width={"50px"} />
                        </td>
                        <>
                            <td className="px-4 py-2">
                                <Skeleton width={"100px"} />
                            </td>
                        </>
                        <td className="flex justify-end p-4 pr-6">
                            <Skeleton width={"30px"} />
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">
                            <Skeleton width={"100px"} />
                        </td>
                        <td className="px-4 py-2">
                            <Skeleton width={"50px"} />
                        </td>
                        <>
                            <td className="px-4 py-2">
                                <Skeleton width={"100px"} />
                            </td>
                        </>
                        <td className="flex justify-end p-4 pr-6">
                            <Skeleton width={"30px"} />
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">
                            <Skeleton width={"120px"} />
                        </td>
                        <td className="px-4 py-2">
                            <Skeleton width={"50px"} />
                        </td>
                        <>
                            <td className="px-4 py-2">
                                <Skeleton width={"100px"} />
                            </td>
                        </>
                        <td className="flex justify-end p-4 pr-6">
                            <Skeleton width={"30px"} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DomainLoading

