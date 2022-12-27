
import { Link }from 'react-router-dom'
import { useContext,useEffect,useState }from 'react'
import {signupContext} from '../signupContext'
function UserList() {
    const{userlocalstorage} = useContext(signupContext)
    const[record, setRecord] = useState([])
    const[sucessdeldte,setSucessdeldte]=useState('');
    const[error,setError]=useState(false);
    useEffect(()=>{
        fetch('/api/userbmr').then((res)=>{return res.json()})
        .then((data)=>{
            setRecord(data)
        });
   },[])

   function handleUserDelete(id){
    let userConfirm=window.confirm('What specifically do you want to remove?');
    if(userConfirm){
    fetch(`/api/recorddelete/${id}`,{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({id})
    }).then((res)=>{return res.json()}).then((data)=>{setSucessdeldte(data.message);
        fetch('/api/showrecord').then((res)=>{return res.json()})
    .then((data)=>{
        setRecord(data)
    });});}
}


function handleUserage(dob){
    let date=new Date();
    let setDate =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let birtDate =new Date(dob);
    let oldData = birtDate.getFullYear() + "-" + (birtDate.getMonth() + 1) + "-" + birtDate.getDate();
    let validDate=(new Date(setDate))-(new Date(oldData))
    const curruntAge = new Date(validDate);
    const d=Math.floor(curruntAge / 31536000000);
    return d;
   }

   function clicktofield(){
    setInsertedMess('');
    setError(false)
}
const[date,setDate] = useState('')
const[foodname,setFoodname] = useState('')
const[meal,setMeal] = useState('')
const[foodGroup,setFoodgroup]=useState('');


const[foodData,setFoodData]=useState([]);

    const[activityName,setActivityName]=useState('');

    const[activityDesc,setActivityDesc]=useState('');
    const[activityMetvalue,setMetvalue]=useState('');
    const[activityDuration,setDuration]=useState('');

    const[activityData,setactivityData]=useState([]);
const[insertedMess,setInsertedMess]=useState('');
const[serving,setServing]=useState('');
const[calaroies,setCalaroies]=useState('');
const[ids,setIds]=useState('')


function handleFoodform(e){
    e.preventDefault();
    setInsertedMess('');
        if(!date|| !foodname||foodname==='Select Food Name'||!meal ||meal==='Select Meal type'|| !foodGroup ||foodGroup==='Select food group'|| !serving){
        setError(true);
        setInsertedMess('');
        return false;
       }
    let bodydata={date,foodNamee,foodGroup,meal,serving,ids,calaroies};
    fetch('/api/foodadd',{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(bodydata)
    }).then((res)=>{return res.json()}).then((data)=>{setInsertedMess(data.message)
        if(data.message==='Successfully  inserted add food data'){
            setDate('');
            setFoodname('');
            setMeal('');
            setFoodgroup('');
            setServing('');
            setActivityDesc('')
        setMetvalue('')
        setDuration('')
        }
    })};


function handlefood(e){
    const foodnameid=e.target.value
    setFoodname(foodnameid)
}
const[foodNamee,setfoodNamee]=useState('');
useEffect(()=>{
    fetch('/api/showfooddata')
    .then((res)=>{return res.json()}).then((data)=>{setFoodData(data)});

    fetch('/api/activitydata')
    .then((res)=>{return res.json()}).then((data)=>{setactivityData(data)})
 },[])

useEffect(()=>{
    fetch(`/api/foodgroup/${foodname}`)
    .then((res)=>{return res.json()})
    .then((data)=>{setFoodgroup(data.foodgroup);setServing(data.serveingdesc);
     setCalaroies(data.calaroies);setfoodNamee(data.foodname) }) 
 },[foodname])

 function handleActivity(e){
    e.preventDefault();
    setDate('');
    setActivityDesc('')
    setMetvalue('')
    setDuration('')
    setFoodname('');
        setMeal('');
        setFoodgroup('');
        setServing('');
    setInsertedMess('');
        if(!date|| !activityName||activityName==='Select Activity'|| !activityDesc|| !activityMetvalue|| !activityDuration){
        setError(true)
        return false
    }
let activitydata={date,acti,activityDesc,activityMetvalue,activityDuration,ids};
fetch('/api/showactivityadd',{
    method:'POST',
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(activitydata)
}).then((res)=>{return res.json()}).then((data)=>{setInsertedMess(data.mess)
if(data.mess==='Successfully  inserted add activity data'){
    setDate('');
    setActivityDesc('')
    setMetvalue('')
    setDuration('')
}})
}

function activityNamefun(e){
    const activityId=e.target.value;
    setActivityName(activityId) 
}

const[acti,setActi]=useState('')
    useEffect(()=>{
        fetch(`/api/metdata/${activityName}`)
        .then((res)=>{return res.json()})
        .then((data)=>{setMetvalue(data.METs);setActi(data.ACTIVITY)});
    },[activityName])


   
    function handleId(e,id){
        e.preventDefault();
         setInsertedMess('');
        setIds(id)
    }

    return ( 
        <>
          {userlocalstorage ?
      <>
            <div>
        <div className="mid-container">
            <div className="container">
                <div className="title-row d-flex justify-content-between" >
                    <h1 className="title">User List</h1>
                    <p>{sucessdeldte}</p>
                </div>
                <div className="user-list">
                    <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                        <thead>
                            <tr>
                                <th scope="col" className="name">Name</th>
                                <th scope="col" className="weight">Weight</th>
                                <th scope="col" className="height">Height</th>
                                <th scope="col" className="gender">Gender</th>
                                <th scope="col" className="age">Age</th>
                                <th scope="col" className="bmr">BMR</th>
                                <th scope="col" className="action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {record?
    <>
                        {record.map((result)=>(
                            <tr key={result._id}>
                                <th scope="row">{result.name}</th>
                                <td data-label="Weight">{result.weight}</td>
                                <td data-label="Height">{result.height}</td>
                                <td data-label="Gender">{result.sex}</td>
                                <td data-label="Age">{handleUserage(result.dob)}</td>
                                <th scope="col">{parseFloat(result.bmr).toFixed(2)}</th>
                                <td data-label="Action">
                                
                                    <div className="btn-set">
                                       
                                    <button className="btn-primary add-data-btn" data-bs-toggle="modal" data-bs-target="#addDataModal" onClick={(e)=>{handleId(e,result._id)}}>Add
                                            Data</button>
                                            <Link className="btn-secondary text " to={`/view/${result._id}`}>View</Link>
                                           <button onClick={(e)=>{handleUserDelete(result._id)}} className="btn btn-danger"> <i className="bi bi-trash3"></i> </button>
                                   </div>
                                </td>
                            </tr>
                            ))}     
                            </>
    :
    <>
    <h1>No records found</h1>
    
    </>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
    </div>
    
    <div className="modal fade" id="addDataModal" tabIndex="-1" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content add-data-modal">
                <div className="modal-header">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <Link className="nav-link active" id="food-tab" data-bs-toggle="tab" to="#food" role="tab"
                                aria-controls="food" onClick={clicktofield} aria-selected="true" >Add Food</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className="nav-link" id="activity-tab" data-bs-toggle="tab" to="#activity" role="tab"
                                aria-controls="activity" onClick={clicktofield} aria-selected="false" >Add Activity</Link>
                        </li>
                    </ul>
                </div>
                <div className="modal-body">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="food" role="tabpanel" aria-labelledby="food-tab">
                        <form onSubmit={(e)=>{handleFoodform(e)}}>
                            <div className="input-field">
                            <p className='text-center'>{insertedMess}</p>
                                <label>Select Date</label>
                                <input type="date" placeholder="Age" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                                {error&&!date?<p className='text-danger'>Enter date</p>:""}
                            </div>


                            <div className="input-field">
                                <label>Select Food Name</label>
                                <select className="selectbox" value={foodname} onChange={(e)=>{handlefood(e)}}>
                                <option>Select food name</option>
                                    {foodData.map((result)=>(
                                        <option key={result._id} value={result._id}>{result.name}</option>
                                    ))}
                                </select>
                                {error&&!foodname?<p className='text-danger'>Select food name</p>:""}
                            </div>


                            <div className="input-field">
                                <label>Select Meal Type</label>
                                <select className="selectbox" value={meal} onChange={(e)=>{setMeal(e.target.value)}}>
                                    <option>Select Meal type</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                {error&&!meal?<p className='text-danger'>Enter Meal Type</p>:""}
                            </div>

                            <div className="input-field">
                                <label>Select Food Group</label>
                                <select className="selectbox" value={foodGroup} onChange={(e)=>{setFoodgroup(e.target.value)}} >
                                    <option>{foodGroup}</option>
                                </select>
                                {error&&!foodGroup?<p className='text-danger'>Select Food Group</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Serving</label>
                                <input type="text" placeholder="Serving" value={serving} onChange={(e)=>{setServing(e.target.value)}} />
                                {error&&!serving?<p className='text-danger'>Enter serving</p>:""} 
                            </div>
                           
                            <div className="input-field input-field-btn btn-set--center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="sumbit" className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </form>
                        </div>

                        <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                        <form onSubmit={(e)=>{handleActivity(e)}}>
                            <p className='text-center' >{insertedMess}</p>
                            <div className="input-field">
                                <label>Select Date</label>
                                <input type="date" placeholder="Age" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                                {error&&!date?<p className='text-danger'>Enter date</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Select Activity</label>
                                <select className="selectbox" value={activityName} onChange={(e)=>{activityNamefun(e)}}>
                                    <option>Select Activity</option>
                                    {activityData.map((result)=>(
                                        <option key={result._id} value={result._id} style={{width:'14px'}}>{result.ACTIVITY}{result.SPECIFICMOTION}</option>
                                    ))}
                                    {error&&!activityName?<p className='text-danger'>Select Activity Name</p>:""}
                                </select>
                            </div>
                            <div className="input-field">
                                <label>Activity Description</label>
                                <textarea placeholder="Description" value={activityDesc} onChange={(e)=>{setActivityDesc(e.target.value)}}></textarea>
                                {error&&!activityDesc?<p className='text-danger'>Enter Activity Description</p>:''} 
                            </div>
                            <div className="input-field">
                                <label>MET Value</label>
                                <input type="text" placeholder="Value" value={activityMetvalue} onChange={(e)=>{setMetvalue(e.target.value)}} disabled/>
                                
                                {error&&!activityMetvalue?<p className='text-danger'>Enter Met value</p>:''} 
                            </div>
                            <div className="input-field">
                                <label>Activity Duration in minutes</label>
                                <input type="number" placeholder="Time" value={activityDuration} onChange={(e)=>{setDuration(e.target.value)}}/>
                               
                                {error&&!activityDuration?<p className='text-danger'>Enter Activity Duration</p>:''} 
                            </div>
                            
                            <div className="input-field input-field-btn btn-set--center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
   :

<h5 className='text-center my-5' >Not a member? <Link to="/">Singnup now</Link> </h5> 
}
        </>
     );
}

export default UserList;
