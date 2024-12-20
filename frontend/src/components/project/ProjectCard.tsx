import { useNavigate } from "react-router-dom"
import ActiveStatus from "../ui/ActiveStatus"
import AvatarList from "../ui/AvatarList"

interface IUserAvatar {
    email: string
    photo: string
}

interface IProjectCard {
    id: number
    name: string
    domain: string
    status: boolean
    users: IUserAvatar[]
}

const ProjectCard: React.FC<IProjectCard> = ({ id, name, domain, status, users }) => {
    const navigate = useNavigate()
    return (
        <div
            className="flex flex-col justify-center gap-[10px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card cursor-pointer"
            onClick={() => navigate(`/project/${id}`)}
        >
            <h4>{name}</h4>
            <div className="flex gap-2">
                <ActiveStatus status={status} />
                <p>{domain}</p>
            </div>
            <AvatarList users={users} />
        </div>
    )
}

export default ProjectCard
