const NotFound = () => {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
            <h1>Page Not Found</h1>
            <a href="/project" className="text-lg mt-5 text-primary hover:text-secondary underline-offset-2 underline">
                Go to Home Page
            </a>
        </div>
    )
}

export default NotFound
