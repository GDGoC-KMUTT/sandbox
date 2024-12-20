import { useState } from "react"
import CreateProjectModal from "../../components/modal/CreateProjectModal.tsx"
import ProjectCard from "../../components/project/ProjectCard.tsx"
import MainLayout from "../../layouts/MainLayout"

const Project = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCreateProject = (name: string, description: string) => {
        console.log("Project Created:", { name, description })
    }
    const project = {
        id: 1,
        name: "Etalert",
        domain: "eta.scnn.me",
        status: true,
        users: [
            { email: "user1@example.com", photo: "https://via.placeholder.com/30" },
            { email: "user2@example.com", photo: "https://via.placeholder.com/30" },
            { email: "sam@example.com", photo: "https://via.placeholder.com/30" },
            { email: "user1@example.com", photo: "https://via.placeholder.com/30" },
            { email: "user1@example.com", photo: "https://via.placeholder.com/30" },
            { email: "user2@example.com", photo: "https://via.placeholder.com/30" },
            { email: "user2@example.com", photo: "https://via.placeholder.com/30" },
            { email: "user2@example.com", photo: "https://via.placeholder.com/30" },
        ],
    }

    const headerContent = (
        <>
            <h2>Project</h2>
            <button onClick={() => setIsModalOpen(true)}>+ New</button>
            <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProject} />
        </>
    )

    const bodyContent = (
        <div className="flex flex-wrap">
            <ProjectCard {...project} />
        </div>
    )

    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}

export default Project

