import { useAuthStore } from "../../hooks/useAuthStore"


export const Logout = () => {

    // invoking logout function
    const { startLogout } = useAuthStore();

    return (
        <div className="navbar navbar-dark bg-dark mt-1.5 px-4">
            <button 
                className="btn btn-outline-danger"
                onClick={ startLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Log out</span>
            </button>
        </div>
    )
}