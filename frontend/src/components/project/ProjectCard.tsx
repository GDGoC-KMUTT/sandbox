import { useNavigate } from "react-router-dom"
import AvatarList from "../ui/AvatarList"
import { Project } from "../../types/project"

const ProjectCard: React.FC<Project> = ({ project_id, name, domain, users }) => {
    const navigate = useNavigate()
    return (
        <div
            className="flex flex-col justify-center gap-[10px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card cursor-pointer"
            onClick={() => navigate(`/project/${project_id}`)}
        >
            <h4>{name}</h4>
            <div className="flex gap-2">
                <p>{domain}</p>
            </div>
            <AvatarList users={users} />
        </div>
    )
}

export default ProjectCard
