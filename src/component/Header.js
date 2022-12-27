import { useContext }from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {signupContext} from '../signupContext'
function Header() {
    const{userlocalstorage,setUserlocalstorage} = useContext(signupContext)
   const navigate = useNavigate()
    function handleLogout(e){
        e.preventDefault();
        setUserlocalstorage(localStorage.removeItem('username'));
        navigate('/');
    }
    return ( 
        <>
        <header className="header">
                <div className="container">
                    <div className='row' >
                        {userlocalstorage?
                        <>
                        <div className='col-md-3' ><div className="logo">
                        <Link to="/">
                            <img src="assets/img/logo.png"/>
                        </Link>
                    </div></div>
                        <div className='col-md-6' ></div>
                        <div className='col-md-3 text-center' >
                          <button type="button" className="btn btn-danger" onClick={handleLogout} >Logout</button>
                            </div>
                            </>
                            :
<>
                        <div className='col-md-3' ><div className="logo">
                        <Link to="/">
                            <img src="assets/img/logo.png"/>
                        </Link>
                    </div></div>
                        <div className='col-md-6' ></div>
                        <div className='col-md-3 text-center' >
                          
                            
                            </div>
                            </>
                        }


                    </div>
                    
                </div>
            </header>
        </>
     );
}

export default Header;