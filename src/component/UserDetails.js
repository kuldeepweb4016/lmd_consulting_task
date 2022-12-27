import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
function UserDetails() {
    const {id}=useParams();
    const [name,setName]=useState('')
    const [food,setFood]=useState([]);
    
    const [calorieout,setCalorieout]=useState([])
    const [bmr,setbmr]=useState('');
    const [weight,setWeight]=useState('')
  
    useEffect(()=>{
        fetch(`/api/viewuserdata/${id}`).then((res)=>{return res.json()}).then((data)=>{
            setFood(data.food);
            setName(data.user.name);
            setbmr(parseFloat(data.user.bmr).toFixed(2))
            setCalorieout(data.calout);
            setWeight(data.user.weight)
        })}
        ,[id])
        let totalActivity=null;
        let totalFood=null;
        let calout=[]
        function caloout(date){
            for(let a in calorieout){
                 if(calorieout[a].date===date&&calorieout[a].userId===id){
                    calout.push(parseFloat(calorieout[a].met*weight*calorieout[a].duration/60).toFixed(2));
                 }
             }
            return calout   
        }
       
       
    return (
         <>
         <div>
        <div className="mid-container">
            <div className="container">
                <div className="title-row">
                    <h1 className="title">{name}</h1>
                </div>
                
                <div className="view-calorie-data">
                    <div className="view-calorie-data-chart">
                        <div className="food-data white-card">
                            <h2>Food Data</h2>
                            <div className="food-data-table">
                                <table
                                    className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Meal Type</th>
                                            <th scope="col">Food Group</th>
                                            <th scope="col">Serving</th>
                                            <th scope="col">Calorie In</th>
                                        </tr>
                                    </thead>
                                    {!food?
                                        <tbody><tr>
                                        <td colSpan={5}><h1>No data Found</h1></td>
                                        </tr>
                                    </tbody>:
                                    <tbody>
                                        {food.map((result,keys)=>(
                                            <tr key={result._id}>
                                            <th scope="row">{result.date}</th>
                                            <td data-label="Meal Type">{result.mealType}</td>
                                            <td data-label="Food Group">{result.foodGroup}</td>
                                            <td data-label="Serving">{result.serving}</td>
                                            <td data-label="Calorie In">{result.calaroies}</td>
                                        </tr>
                                        ))}

                                    </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="activity-data white-card">
                            <h2>Activity Data</h2>
                            <div className="activity-data-table">
                                <table
                                    className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">MET Value</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Calorie Out</th>
                                        </tr>
                                    </thead>
                                        {calorieout.length===0?<tbody><tr><td colSpan={5}><h1>No record Found</h1></td></tr></tbody>:<>
                                        {calorieout.map((result,keys)=>(
                                    <tbody key={result._id}>
                                            <tr>
                                            <th scope="row">{result.date}</th>
                                            <td data-label="Name" >{result.name}</td>
                                            <td data-label="Description">{result.desc}</td>
                                            <td data-label="MET Value">{result.met}</td>
                                            <td data-label="Duration">{result.duration}min.</td>
                                            <td data-label="Calorie Out">{caloout(result.date)[keys]}</td>
                                        </tr>
                                    </tbody>
                                        ))}
                                        </>
                                        }
                                </table>
                            </div>
                        </div>
                        <div className="net-calorie-data white-card">
                            <h2>Net Calorie</h2>
                            <div className="net-calorie-table">
                                <div className="net-calorie-row">
                                    <strong>BMR: </strong>
                                    <span>{bmr}</span>
                                </div>
                               
                                <div className="net-calorie-row">
                                    <strong>Food: </strong>
                                    {!food?<><span>0</span></>:
                                    <span>
                                    {food.reduce((total,item)=>{
                                        totalFood=total+Number(item.calaroies)
                                        return total + Number(item.calaroies)
                                    },0)}
                                    </span>
                                    }
                                </div>
                                <div className="net-calorie-row">
                                    <strong>Activity: </strong>
                                    {calorieout.length===0?
                                    <>
                                    <p>0</p>
                                    </>:
                                    <span>{calout.reduce((total,item)=>{
                                        totalActivity=total+Number(item)
                                        return total + Number(item)
                                    },0)}</span>
                                    }
                                </div>
                                <div className="net-calorie-row net-calorie-totl">
                                    <strong>Net Calorie:</strong>
                                    <span>{totalFood-bmr-totalActivity===(-Math.abs(bmr))?'0':totalFood-bmr-totalActivity}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </> );
}

export default UserDetails;