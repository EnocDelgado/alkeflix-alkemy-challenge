import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { AlkeflixPage } from '../home/page/AlkeflixPage';
import { Details } from '../home/page/Details';
import { Favourites } from '../home/page/Favourites';
import { Results } from '../home/page/Results';
import { useAuthStore } from '../hooks/useAuthStore';

export const AppRouter = () => {

    
    const [ favourites, setFavourites ] = useState([]);

    useEffect( () => {
        const favsInLocal = localStorage.getItem('favs');

        if ( favsInLocal !== null )  {
            const favsArray = JSON.parse( favsInLocal );
            setFavourites( favsArray );
        }
    }, [])

    const addOrRemoveFromFavs = ( event ) => {
        // To Know if this user has favourites
        const favMovies = localStorage.getItem('favs');

        let tempMoviesInFavs;

        if ( favMovies === null ) {
            tempMoviesInFavs = [];
        } else {
            tempMoviesInFavs = JSON.parse( favMovies );
        }

        const btn = event.currentTarget;
        // get parent element ( html element that is interacting with)
        const parent = btn.parentElement;
        // get information
        const imgURL = parent.querySelector('img').getAttribute('src');
        const title = parent.querySelector('h5').innerText;
        const overview = parent.querySelector('p').innerText;

        const movieData = { 
            imgURL,
            title,
            overview,
            // html5 Data attribute, store
            id: btn.dataset.movieId
        }

        let movieIsInArray = tempMoviesInFavs.find( oneMovie => {
            return oneMovie.id === movieData.id
        })

        if ( !movieIsInArray ) {
            // Add to favourites
            tempMoviesInFavs.push( movieData );
            //
            localStorage.setItem( 'favs', JSON.stringify( tempMoviesInFavs ) );

            setFavourites( tempMoviesInFavs ); // State
        } else {
            let moviesLeft = tempMoviesInFavs.filter( oneMovie => {
            return oneMovie.id !== movieData.id
            })

            localStorage.setItem( 'favs', JSON.stringify( moviesLeft ) );

            setFavourites( moviesLeft );
        }
    }


    const { status, checkAuthToken } = useAuthStore();

    useEffect( () => {
        checkAuthToken();
    }, [])

    //
    if ( status === 'checking' ) {
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <>
            <Routes>
                {
                    ( status === 'authenticated' )
                    // If user is authenticatedAlkeflixPage
                    ? (
                        <>
                            
                            <Route path="/user/home" element={ <AlkeflixPage props={ addOrRemoveFromFavs } /> } />
                            <Route path="/*" element={ <Navigate to="/user/home" /> } />

                            <Route path="/user/detail" element={ <Details /> } />
                            <Route path="/user/favourites" element={ <Favourites favourites={ favourites } props={ addOrRemoveFromFavs } /> } /> 
                            <Route path="/user/results" element={ <Results /> } /> 

                            
                        </> 
                    )
                    // Else go to login
                    : (
                        <>
                            <Route path="/auth/*" element={ <LoginPage/> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />

                            <Route path="/auth/register" element={ <RegisterPage /> } />
                        </>
                    )
                }

            </Routes>
        </>
    )
}
