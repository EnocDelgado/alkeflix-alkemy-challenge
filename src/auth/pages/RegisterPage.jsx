import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Footer } from '../../home/components/Footer';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './RegisterPage.css'

// Withhold registration
const registerFromFields = {
    registerName:       '',
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
}

export const RegisterPage = () => {

    // invocking authStore
    const {  startRegister, errorMessage } = useAuthStore();

    //invoke our customHook
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFromFields );
    
    const registerSubmit = ( event ) => {
        event.preventDefault();

        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Register Error', 'Passwords are not the same ', 'error');
            return;
        }
        // authStore revice our information
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    // Display error when authentication fails
    useEffect( () => {
        if ( errorMessage !== undefined ) {
            Swal.fire('Authentication Error', errorMessage, 'error');
        }
    }, [ errorMessage ] )

    return (
        <>
            <div className="container login-container-register">
                <div className="row">
                <div className="col-md-6 login-form-2">
                        <h3>Sign Up</h3>
                        <form onSubmit={ registerSubmit }>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    name='registerName'
                                    value={ registerName }
                                    onChange={ onRegisterInputChange }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name='registerEmail'
                                    value={ registerEmail }
                                    onChange={ onRegisterInputChange }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name='registerPassword'
                                    value={ registerPassword }
                                    onChange={ onRegisterInputChange }
                                />
                            </div>

                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repeat Password"
                                    name='registerPassword2'
                                    value={ registerPassword2 }
                                    onChange={ onRegisterInputChange } 
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <input 
                                    type="submit" 
                                    className="btnSubmit" 
                                    value="Create account" />
                            </div>
                        </form>
                    </div>

                    <div className="d-grid gap-4 mt-4">
                        <span>Have you an account? <Link to='/login'>Sign In</Link></span>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
