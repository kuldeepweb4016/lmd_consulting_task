import { useState }from 'react'
import { useContext }from 'react'
import {signupContext} from '../signupContext'
import {useNavigate} from 'react-router-dom'
function SignUp() {
    const[signupname,setSignupname] = useState('')
    const[signupweight,setSignupweight] = useState('')
    const[signupheight,setSignupheight] = useState('')
    const[signupsex,setSignupsex] = useState('')
    const[signupage,setSignupage] = useState('')
    const[error,setError]=useState(false)
    const [usermessage,setUsermessage]=useState('')
    let navigate=useNavigate();
    const{setUserlocalstorage} = useContext(signupContext)
   

    function handleForm(e){
        e.preventDefault()
        const formData = {signupname,signupweight,signupheight,signupsex,signupage}
            if(!signupname|| !signupweight|| !signupheight||signupsex===''|| !signupage){
            setError(true);
            return false;
        }
        fetch('/api/usersignup',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(formData)
        }).then((res)=>{return res.json()}).then((data)=>{if(data.name){   
               localStorage.setItem('username',data.name)
               setUserlocalstorage(localStorage.getItem('username'))
   
               navigate('/userlist')
           }else{
               setUsermessage(data.message);
           }})
    }

    return ( 
        <>
            <div>
            <div className="mid-container">
                <div className="signup-container">
                    <div className="white-card">
                        <h1>Sign Up</h1>
                        <div className="card-body">
                            <form method='POST' onSubmit={(e)=>{handleForm(e)}} >
                            <p className='color-red text-center' > {usermessage}</p>
                            <div className="input-field">
                                <label>Name</label>
                                <input type="text" placeholder="Name"
                                value={signupname} 
                                onChange={(e)=>{setSignupname(e.target.value)}}/>
                                 {error&& !signupname?<p className='text-danger'>Please enter your Name</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Weight</label>
                                <input type="text" placeholder="Weight"
                                value={signupweight} 
                                onChange={(e)=>{setSignupweight(e.target.value)}}
                                />
                                 {error && !signupweight?<p className='text-danger'>Please enter your Wieght</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Height</label>
                                <input type="text" placeholder="Height"
                                value={signupheight} 
                                onChange={(e)=>{setSignupheight(e.target.value)}}
                                />
                                {error&& !signupheight?<p className='text-danger'>Please enter your Height </p>:""}
                            </div>
                            <div className="input-field">
                                <label>Gender</label>
                                <select className="selectbox"
                                value={signupsex} 
                                onChange={(e)=>{setSignupsex(e.target.value)}}
                                >
                                <option></option><option>Male</option><option>Female</option>
                                </select>
                                {error&& !signupsex?<p className='text-danger'>Please select your sex</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Age</label>
                                <input type="date" placeholder="Age" 
                                value={signupage} 
                                onChange={(e)=>{setSignupage(e.target.value)}}
                                />
                                 {error&& !signupage?<p className='text-danger'>Enter date</p>:""}
                            </div>
                            <div className="input-field btn-set--right">
                                <button  className="btn-primary">Sign Up</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        </>
     );
}

export default SignUp;