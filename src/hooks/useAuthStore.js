import { useDispatch, useSelector } from "react-redux"
import alkeflixApi from "../api/alkeflixApi";
import { onLogoutAlkeflix } from "../store/alkeflix/alkeflixSlice";
import { onLogin, onLogout, onChecking, clearErrorMessages } from '../store/auth/authSlice';

/**
 * This function performs any interaction with the authStore
 * @returns Properties and Methods
 */
export const useAuthStore = () => {

    // use information from store
    const { status, user, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    // get specific object from store
    const startLogin = async({ email, password }) => {

        // verify credentials
        dispatch( onChecking() )

        // Getting our Backend
        try {
            // Conecting our CRUD operations 
            const { data } = await alkeflixApi.post('/auth/login', { email, password })
            // stablish token on local storage
            localStorage.setItem('token', data.token );
            // save date to know if toke is valid
            localStorage.setItem('token-init-date', new Date().getTime() ); 
            // the specified things that will save
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch ( error ) {
            dispatch( onLogout('Incorrect credentials') )
            setTimeout( () => {
                dispatch( clearErrorMessages() );
            }, 10);
        }
    }   

    const startRegister = async({ email, password, name }) => {

        // verify credentials
        dispatch( onChecking() )

        // Getting our Backend
        try {
            // Conecting our CRUD operations 
            const { data } = await alkeflixApi.post('/auth/register', { email, password, name })
            // stablish token on local storage
            localStorage.setItem('token', data.token );
            // save date to know if toke is valid
            localStorage.setItem('token-init-date', new Date().getTime() ); 
            // the specified things that will save
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch ( error ) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout( () => {
                dispatch( clearErrorMessages() );
            }, 10);
        }
    }   

    const checkAuthToken = async() => {

        // verify if exists token
        const token = localStorage.getItem( 'token' );
        if ( !token ) return dispatch( onLogout() );


        // Getting our Backend
        try {
            // Conecting our CRUD operations 
            const { data } = await alkeflixApi.get('/auth/renew');
            // stablish token on local storage
            localStorage.setItem('token', data.token );
            // save date to know if toke is valid
            localStorage.setItem('token-init-date', new Date().getTime() ); 
            // the specified things that will save
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch ( error ) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    } 

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutAlkeflix() );
        dispatch( onLogout() );
    }

    return {
        // * Properties 
        status, 
        user, 
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
