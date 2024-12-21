import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const ProjectCardLoading = () => {
    return (
        <div className="flex flex-col justify-center gap-[10px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card cursor-pointer">
            <h4>
                <Skeleton />
            </h4>
            <p>
                <Skeleton width={"60%"} />
            </p>
            <div className="relative flex items-center h-[30px]">
                <Skeleton className="absolute top-0" circle={true} width={"30px"} height={"30px"} />
                <Skeleton className="relative ml-[-15px]" circle={true} width={"30px"} height={"30px"} />
                <Skeleton className="relative ml-[-15px]" circle={true} width={"30px"} height={"30px"} />
            </div>
        </div>
    )
}

export default ProjectCardLoading

