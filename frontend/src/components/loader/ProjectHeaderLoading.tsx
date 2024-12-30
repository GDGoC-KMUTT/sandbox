import { IoMdSettings } from "react-icons/io"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const ProjectHeaderLoading = () => {
    return (
        <>
            <div className={"flex flex-col gap-[10px]"}>
                <h2>
                    <Skeleton width={"150px"} />
                </h2>
                <div className={"flex gap-2"}>
                    <h3>
                        <Skeleton width={"200px"} />
                    </h3>
                </div>
            </div>
            <div className="flex h-full justify-end items-center">
                <div className="relative flex items-center h-[30px]">
                    <Skeleton className="absolute top-0" circle={true} width={"30px"} height={"30px"} />
                    <Skeleton className="relative ml-[-15px]" circle={true} width={"30px"} height={"30px"} />
                    <Skeleton className="relative ml-[-15px]" circle={true} width={"30px"} height={"30px"} />
                </div>
                <div className="ml-[20px]">
                    <IoMdSettings size={"20px"} className="cursor-pointer" />
                </div>
            </div>
        </>
    )
}

export default ProjectHeaderLoading

