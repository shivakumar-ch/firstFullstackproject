import {useEffect,useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import EachItem from "../eachLi"
import {getUsers,addUser} from "../../mySlice"
import './index.css'

function Home() {
    const dispatch = useDispatch()
    const contacts = useSelector((state)=>state.usersReducer.usersList)
    console.log(contacts,"contacts")

    // const [contacts,changeContacts] = useState([])
    const [name,changeName] = useState('')
    const [income,changeIncome] = useState('')
    const [showUsers,changeShowUsers] = useState(true)

    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])

    const saveData=async(event)=>{
      event.preventDefault()
      changeName('')
      changeIncome('')
      dispatch(addUser({name,income})) 
      dispatch(getUsers())
    }

    useEffect(()=>{
        if(contacts.length===0){
            changeShowUsers(false)
        }else{
            changeShowUsers(true)
        }
    },[contacts])
  
    return (
      <div className="container">
        
        <div className="form-div">
            <h3 className="add-head">Add Users</h3>
        <form className="form-el" onSubmit={saveData}>
          <input className="input-el" type="text" value={name} onChange={(event)=>changeName(event.target.value)} placeholder="Enter Name"/><br/>
          <input className="input-el" type='text' value={income} onChange={(event)=>changeIncome(event.target.value)} placeholder='Enter Income'/><br/>
          <button className="save-btn">save</button>
        </form>
        </div>
        {showUsers ? (
            <>
                <h1>Users List</h1>
                <ul>
                <li className="each-item">
                    <h4 className="name-para">NAME</h4>
                    <h4 className="income-para">INCOME</h4>
                    <h4>EDIT</h4>
                </li>
                {contacts.map(item=>
                <li className='each-item' key={item._id}>
                   <EachItem data={item}/>
                </li>
                )} 
                </ul>
            </>
        
        ):(
            <div className="no-users-div">
                <h1>No Users To Display</h1>
                <p>Add Users</p>
            </div>
        )}
        
        
      </div>
    );
}

export default Home;
