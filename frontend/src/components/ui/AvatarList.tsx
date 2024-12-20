import { useState } from "react"

interface IUser {
    email: string
    photo: string
}

interface AvatarListProps {
    users: IUser[]
}

const AvatarList: React.FC<AvatarListProps> = ({ users }) => {
    const maxDisplayedUsers = 3
    const displayedUsers = users.slice(0, maxDisplayedUsers)
    const extraUsers = users.slice(maxDisplayedUsers)

    const [hoveredUser, setHoveredUser] = useState<string | null>(null)

    return (
        <div className="flex items-center relative">
            {displayedUsers.map((user, index) => (
                <div key={index} className="relative" onMouseEnter={() => setHoveredUser(user.email)} onMouseLeave={() => setHoveredUser(null)}>
                    <img
                        src={user.photo}
                        alt={user.email}
                        className={`min-w-[30px] h-[30px] rounded-full object-cover border-2 border-white ${index !== 0 ? "-ml-2" : ""}`}
                    />
                    {hoveredUser === user.email && (
                        <div className="absolute bottom-[-20px] left-0 w-max px-2 py-1 bg-black text-white rounded-md text-sm z-10">{user.email}</div>
                    )}
                </div>
            ))}

            {extraUsers.length > 0 && (
                <div className="relative" onMouseEnter={() => setHoveredUser("extra")} onMouseLeave={() => setHoveredUser(null)}>
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-300 text-center flex items-center justify-center border-2 border-white -ml-2">
                        +{extraUsers.length}
                    </div>
                    {hoveredUser === "extra" && (
                        <div className="absolute bottom-[-30px] left-0 w-max max-h-[150px] overflow-y-auto bg-white shadow-lg rounded-md border-2 border-gray-300 z-10">
                            <ul className="p-2">
                                {extraUsers.map((user, index) => (
                                    <div>
                                        <li key={index} className="p-1 text-sm">
                                            {user.email}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AvatarList
