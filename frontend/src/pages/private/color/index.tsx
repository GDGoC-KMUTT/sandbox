import { useAtom } from "jotai"
import { authAtom } from "../../../stores/authAtom"

const ColorTest = () => {
    const [authState] = useAtom(authAtom)
    console.log(authState.user)
    return (
        <div className="flex">
            <div className="w-16 h-16 bg-fieldType">Field Type</div>
            <div className="w-16 h-16 bg-form">Form</div>
            <div className="w-16 h-16 bg-primary">Primary</div>
            <div className="w-16 h-16 bg-secondary">Secondary</div>
            <div className="w-16 h-16 bg-foreground">Foreground</div>
            <p>{authState.user?.photoUrl}</p>
        </div>
    )
}

export default ColorTest
