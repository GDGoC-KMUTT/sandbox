import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
const ServerInfoCardLoading = () => {
    return (
        <div className="flex flex-col gap-[5px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card">
            <h4>
                <Skeleton width={"130px"} />
            </h4>
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
            <div className="flex gap-2">
                <p>
                    <Skeleton width={"200px"} />
                </p>
            </div>
        </div>
    )
}

export default ServerInfoCardLoading

