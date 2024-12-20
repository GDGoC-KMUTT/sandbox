import ProjectCard from "../../components/project/ProjectCard.tsx"
import MainLayout from "../../layouts/MainLayout"

const index = () => {
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
            <button>+ New</button>
        </>
    )

    const bodyContent = (
        <div className="flex flex-wrap">
            <ProjectCard {...project} />
        </div>
    )

    return <MainLayout headerContent={headerContent} bodyContent={bodyContent} />
}

export default index
