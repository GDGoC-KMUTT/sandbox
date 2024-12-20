import ProjectCard from "../../../components/project/ProjectCard.tsx"
import useFetchProjects from "../../../hooks/useFetchProjects.ts"
import MainLayout from "../../../layouts/MainLayout"

const Index = () => {
    const { data: projects, isLoading } = useFetchProjects()

    if (isLoading) {
        return <div>isLoading</div>
    }

    const headerContent = (
        <>
            <h2>Project</h2>
            <button>+ New</button>
        </>
    )

    const bodyContent = <div className="flex flex-wrap">{projects?.data.map((project, index) => <ProjectCard key={index} {...project} />)}</div>

    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}

export default Index
