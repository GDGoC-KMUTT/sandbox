import { useState } from "react"
import ProjectCard from "../../../components/project/ProjectCard.tsx"
import useFetchProjects from "../../../hooks/useFetchProjects.ts"
import MainLayout from "../../../layouts/MainLayout"
import CreateProjectModal from "../../../components/modal/CreateProjectModal.tsx"
import useCreateProject from "../../../hooks/useCreateProject.ts"

const Index = () => {
    const { data: projects, isLoading, refetch } = useFetchProjects()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { mutate, isPending } = useCreateProject()

    const handleCreateProject = (name: string, domain: string) => {
        mutate(
            { name: name, domain: domain },
            {
                onSuccess: () => {
                    setIsModalOpen(false)
                    refetch()
                },
                onError: () => {
                    setIsModalOpen(false)
                },
            }
        )
    }

    if (isLoading) {
        return <div>isLoading</div>
    }

    const headerContent = (
        <>
            <h2>Project</h2>
            <button onClick={() => setIsModalOpen(true)}>+ New</button>
            <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProject} isLoading={isPending} />
        </>
    )

    const bodyContent = (
        <div className="flex flex-wrap">
            {projects?.data.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
    )

    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}

export default Index
