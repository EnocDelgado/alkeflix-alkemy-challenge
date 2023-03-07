import { Link } from "react-router-dom";

import { Logout } from "./Logout";
import { SearchEngine } from "./SearchEngine";
import { useAuthStore } from "../../hooks";

import './Navbar.css'

export const Navbar = ( favourites ) => {

    const {  user } = useAuthStore();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <div className="container">
                 <div className="navbar-brand">AlkeFlix</div>
                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                 </button>
                 <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/favourites">Favourites</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <span className="text-success">
                                {
                                    favourites.length > 0 && <>Movies on Favourites: { favourites.length } </>
                                }
                            </span>
                        </li>
                    </ul>
                 </div>
                 <SearchEngine />
                 <div className="navbar navbar-dark bg-dark mb-2 px-4">
                    <span className="navbar-brand">
                        { user.name }
                    </span>
                </div>
                 <Logout />
               </div>
            </nav>
        </header>
    )
}
