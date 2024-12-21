import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
const ServerCardLoading = () => {
    return (
        <div className="flex flex-col justify-center gap-[5px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card">
            <h4>
                <Skeleton width={"150px"} />
            </h4>
            <div className="flex gap-2">
                <p>
                    <Skeleton width={"200px"} />
                </p>
            </div>
            <div className="flex gap-2">
                <p>
                    <Skeleton width={"200px"} />
                </p>
            </div>
            <div className={"flex justify-end"}>
                <Skeleton height={"40px"} width={"100px"} />
            </div>
        </div>
    )
}

export default ServerCardLoading

