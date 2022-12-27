import { BrowserRouter as Router,Route,Routes }from 'react-router-dom'
import SignUp from './component/SignUp'
import Header from './component/Header'
import Footer from './component/Footer'
import Userlist from './component/Userlist'
import Userdata from './component/UserData'
import UserDetails from './component/UserDetails'
import { useState }from 'react'
import { signupContext }  from "./signupContext"

function App() {
  const[userlocalstorage,setUserlocalstorage] = useState(localStorage.getItem('username'))
  return ( 
    <>
    <Router>
    <signupContext.Provider value={{userlocalstorage,setUserlocalstorage}}>
      <Header/>
      <Routes>
      
        <Route path='/' element={<SignUp/>} ></Route>
        <Route path='/userlist' element={<Userlist/>} ></Route>
        <Route path='/view/:id' element={<Userdata/>} ></Route>
        <Route path='/view/userdetails/:id' element={<UserDetails/>} ></Route>

      </Routes>
      <Footer/>
      </signupContext.Provider>
    </Router>
    
    </>
   );
}

export default App;