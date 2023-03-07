import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Footer } from '../../home/components/Footer';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css'


// Withhold registration
const loginFormFields = {
    loginEmail:     '',
    loginPassword:  '',
} 



export const LoginPage = () => {

    // invocking authStore
    const { startLogin, errorMessage } = useAuthStore();

    //invoke our customHook
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );


    //
    const loginSubmit = ( event ) => {
        event.preventDefault();
        // authStore revice our information
        startLogin({  email: loginEmail, password: loginPassword  });
    }


    // Display error when authentication fails
    useEffect( () => {
        if ( errorMessage !== undefined ) {
            Swal.fire('Authentication Error', errorMessage, 'error');
        }
    }, [ errorMessage ] )

    return (
        <>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3>Sign In</h3>
                        <form onSubmit={ loginSubmit }>
                            <div className="form-group mb-2">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    name='loginEmail'
                                    value={ loginEmail }
                                    onChange={ onLoginInputChange }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name='loginPassword'
                                    value={ loginPassword }
                                    onChange={ onLoginInputChange }
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <input 
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login" 
                                />
                            </div>
                        </form>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <span id='create-account'>New to Alkeflix? <Link to='/auth/register'>Sign up Now</Link> </span>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}