import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const SearchEngine = () => {

    const history = useNavigate();

    const submitHandler = ( event ) => {
        event.preventDefault();

        const keyword = event.currentTarget.keyword.value.trim();
        
        if ( keyword.length === 0 ) {
            Swal.fire('You have to write a keyword');
        } else if ( keyword.length < 4 ) {
            Swal.fire('You have to write more than 4 characters');
        } else {
            event.currentTarget.keyword.value = '';
            history(`/user/results?keyword=${ keyword }`)
        }


    }
    return (
        <>
            <form className='d-flex align-items-center' onSubmit={ submitHandler }>
                <label className="form-label mb-0 mx-2">
                    <input className="form-control" type="text" name='keyword' placeholder='Search'/>
                </label>
                <button className="btn btn-success" type='submit'>Search</button>
            </form>
        </>
  )
}