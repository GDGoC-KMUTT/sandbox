import React from "react"

interface ILogoutModal {
    onClose: () => void
    onLogout: () => void
}

const LogoutModal: React.FC<ILogoutModal> = ({ onClose, onLogout }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-background rounded-md shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4"> Logout</h2>

                <p className="text-lg mb-3">Are you sure you want to logout?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-background border-2 border-form hover:bg-form hover:border-form text-foreground"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="px-6 text-white bg-red-400 hover:bg-red-600" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal

