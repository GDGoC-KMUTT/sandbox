import { UserIcon, KeyIcon } from "@heroicons/react/24/outline"

interface ICredential {
    user: string
    password: string
}

const CredentialCard: React.FC<ICredential> = ({ user, password }) => {
    return (
        <div className="flex flex-col gap-[5px] min-w-[300px] min-h-[150px] p-[20px] m-[20px] rounded-2xl bg-background shadow-card">
            <h2>SSH Credential</h2>
            <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-form" />
                <p>{user}</p>
            </div>
            <div className="flex items-center gap-2">
                <KeyIcon className="w-5 h-5 text-form" />
                <p>{password}</p>
            </div>
        </div>
    )
}

export default CredentialCard
