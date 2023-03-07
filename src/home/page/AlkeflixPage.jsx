import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Navbar } from "../components/Navbar";

export const AlkeflixPage = ({ props }) => {

    // get token from Login
    // sessionStorage.getItem('token');

    const [ moviesList, setMoviesList ] = useState([]);

    useEffect( () => {
        const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=f81980ff410e46f422d64ddf3a56dddd&language=en-En&page=1`
        axios.get( endPoint )
            .then( res => { 
                const apiData = res.data;
                setMoviesList( apiData.results );
            })
            .catch( error => { Swal.fire('Error al cargar, intenta mas tarde!',  error, 'error'); });
    }, [ setMoviesList ]);

    return (
        <>
            <Navbar />
            <div className="row">
                {/* Basic Structure */}
                {
                    moviesList.map( ( oneMovie, idx ) => {
                        return(
                            <div className="col-3" key={ idx }>
                                <div className="card my-4">
                                    <img src={ `https://image.tmdb.org/t/p/w500/${ oneMovie.poster_path }` } className="card-img-top" alt="..." />
                                    <button 
                                        className="farourite-btn"
                                        onClick={ props }
                                        data-movie-id={ oneMovie.id }
                                    >
                                        🖤
                                        </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{ oneMovie.title.substring(0, 30) }...</h5>
                                        <p className="card-text">{ oneMovie.overview.substring(0, 100) }...</p> {/* substring is to get an specific characters of a string */}
                                        <Link to={ `/user/detail?movieID=${ oneMovie.id }` } className="btn btn-primary">View Detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </>
    )
}
