import { useQuery } from "@tanstack/react-query"
import { Axios } from "../../configs/axios/axiosInstance"
import { useAtom } from "jotai"
import { counterAtom } from "../../stores/counterAtom"

const fetchPingPong = async () => {
    const response = await Axios.get("api/sample/pingpong")
    return response.data
}

const Index = () => {
    const [counter] = useAtom(counterAtom)
    const { data, error, isLoading } = useQuery({
        queryKey: ["pingpong"],
        queryFn: fetchPingPong,
    })

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            <div>{data.message}</div>
            <div>{counter}</div>
        </>
    )
}

export default Index
