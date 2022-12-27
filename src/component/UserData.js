import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
function UserData() {
    
    const[viewname,setViewname] =useState('')
    const [viewfood,setViewfood]=useState([]);
    const [viewbmr,setViewbmr]=useState('');
    const [viewweight,setViewweight]=useState('')
    const [calorieout,setCalorieout]=useState('')
    const [activity,setActivity]=useState([]);
   
    const {id}=useParams();
    useEffect(()=>{
        fetch(`/api/viewuserdata/${id}`)
        .then((res)=>{return res.json()})
        .then((data)=>{setViewname(data.user.name);setViewweight(data.user.weight);setViewfood(data.food);setViewbmr(parseFloat(data.user.bmr).toFixed(2));setCalorieout(data.calout);
        setActivity(data.calout)
        })},[])
        let calout=[]
        function caloout(date){ 
            for(let a in calorieout){
                 if(calorieout[a].date===date&&calorieout[a].userId===id){
                    calout.push(parseFloat(calorieout[a].met*viewweight*calorieout[a].duration/60).toFixed(2));
                 }
             }


            return calout
            
        }
    function netcal(calaroies,viewbmr,keys){
        return parseFloat(calaroies-viewbmr-calout[keys]).toFixed(2)
    }
    return ( <>
        <div>
        <div className="mid-container">
            <div className="container user-all-date-data">
                <div className="title-row">
                    <h1 className="title">{viewname}</h1>
                </div>
                <div className="user-list ">
                    <div className="white-card">
                        <h2>All Data</h2>
                        <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">BMR</th>
                                    <th scope="col">Calorie In</th>
                                    <th scope="col">Calorie Out</th>
                                    <th scope="col">Net Calorie</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            {viewfood.length===0&&calorieout.length===0?<tbody><tr><td colSpan={6}><h1 className='text-center'>No data Found</h1></td></tr></tbody>:<>
                            {viewfood.map((result,keys)=>(
                                <tbody key={result._id}>
                                <tr>
                                    <th scope="row">{result.date}</th>
                                    <td data-label="BMR">{viewbmr}</td>
                                    <td data-label="Calorie In">{result.calaroies}</td>
                                    <td data-label="Calorie Out">{caloout(result.date)[keys]}</td>
                                    <td data-label="Net Calorie">{netcal(result.calaroies,viewbmr,keys)}</td>
                                    <td data-label="Action">
                                        <div className="btn-set">
                                          <Link className="btn-secondary" to={`/view/userdetails/${id}`}>View</Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            ))}
                            </>
                            }
                            {viewfood.length===0?
                            <>
                            {activity.map((result,keys)=>(
                            <>
                                <tbody key={result._id}>
                                <tr>
                                    <th scope="row">{result.date}</th>
                                    <td data-label="BMR">{viewbmr}</td>
                                    <td data-label="Calorie In">0</td>
                                    <td data-label="Calorie Out">{caloout(result.date)[keys]}</td>
                                    <td data-label="Net Calorie">0</td>
                                    <td data-label="Action">
                                        <div className="btn-set">
                                          <Link className="btn-secondary" to={`/view/userdetails/${id}`}>View</Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            </>

                            ))}

                            </>
                            :null   
                             }
                               
                        </table>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    </> );
}

export default UserData;