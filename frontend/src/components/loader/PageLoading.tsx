import { DotLottieReact } from "@lottiefiles/dotlottie-react"

const PageLoading = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex items-center justify-center w-[100px] h-[50px]">
                <DotLottieReact src="https://lottie.host/7ea58b4a-787a-4a2e-8b95-0a3b49410e4e/TOLCtn7yY7.lottie" loop autoplay />
            </div>
        </div>
    )
}

export default PageLoading

