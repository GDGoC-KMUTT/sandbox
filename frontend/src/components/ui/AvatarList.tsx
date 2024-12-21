import { useState } from "react"
import { UserAvatar } from "../../types/project"
import avatar from "../../assets/avatar.jpg"

interface AvatarListProps {
    users: UserAvatar[]
    position?: "l" | "r" | "t" | "b" | "lt" | "rt" | "lb" | "rb"
}

const AvatarList: React.FC<AvatarListProps> = ({ users, position = "lb" }) => {
    const maxDisplayedUsers = 3
    const displayedUsers = users.slice(0, maxDisplayedUsers)
    const extraUsers = users.slice(maxDisplayedUsers)

    const [hoveredUser, setHoveredUser] = useState<string | null>(null)

    const positionClasses = {
        l: "right-full top-1/2 transform -translate-y-1/2",
        r: "left-full top-1/2 transform -translate-y-1/2",
        t: "bottom-full left-1/2 transform -translate-x-1/2",
        b: "top-full left-1/2 transform -translate-x-1/2",
        lt: "bottom-full left-0",
        rt: "bottom-full right-0",
        lb: "top-full left-0",
        rb: "top-full right-0",
    }

    return (
        <div className="flex items-center relative">
            {displayedUsers.map((user, index) => (
                <div key={index} className="relative" onMouseEnter={() => setHoveredUser(user.email)} onMouseLeave={() => setHoveredUser(null)}>
                    <img
                        src={user.photo_url || avatar}
                        alt={user.email}
                        className={`min-w-[30px] h-[30px] rounded-full object-cover border-2 border-white ${index !== 0 ? "-ml-2" : ""}`}
                        onError={(e) => {
                            e.currentTarget.src = avatar
                        }}
                    />
                    {hoveredUser === user.email && (
                        <div className={`absolute z-10 w-max px-2 py-1 bg-black text-white rounded-md text-sm ${positionClasses[position]}`}>
                            {user.email}
                        </div>
                    )}
                </div>
            ))}

            {extraUsers.length > 0 && (
                <div className="relative" onMouseEnter={() => setHoveredUser("extra")} onMouseLeave={() => setHoveredUser(null)}>
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-300 text-center flex items-center justify-center border-2 border-white -ml-2 select-none">
                        +{extraUsers.length}
                    </div>
                    {hoveredUser === "extra" && (
                        <div
                            className={`absolute z-10 w-max max-h-[150px] overflow-y-auto bg-white shadow-lg rounded-md border-2 border-gray-300 ${
                                positionClasses[position]
                            }`}
                        >
                            <ul className="p-2">
                                {extraUsers.map((user, index) => (
                                    <li key={index} className="p-1 text-sm">
                                        {user.email}
                                    </li>
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
