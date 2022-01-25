import { useEffect,useState } from 'react'
import './index.css'
import {delUsers,getUsers,updateUser} from "../../mySlice"
import {useDispatch} from "react-redux"

function EachItem(props) {
  const{data} = props
  const {_id,name,income}=data

  const dispatch = useDispatch()
  const [editedName, setEditedName] = useState('');
  const [editedIncome, setEditedIncome] = useState('');
  const [showEditBox, toggleEditedBox] = useState(true);
  // const [errMsg, changeErrMsg] = useState('');

  useEffect(()=>{
    setEditedName(name)
    setEditedIncome(income)
  },[showEditBox,name,income])
 
    const delData=async()=>{
          dispatch(delUsers(_id))
          dispatch(getUsers())
      }
    
    const editBoxFunc=()=>{
      toggleEditedBox(!showEditBox)
    }

    const updateUserFunc=()=>{
      if(editedName !=='' && editedIncome!==''){
        dispatch(updateUser({_id,name:editedName,income:editedIncome}))
      editBoxFunc()
      dispatch(getUsers())
      }else{
        alert("Enter Valid Inputs")
      }
       
    }

    return  <>
              {showEditBox ? (
              <>
                <p className='name-para'>{name}</p>
                <p className='income-para'>{income}</p>
                <div>
                  <button onClick={delData} className='del-btn'>del</button>
                <button className='del-btn' onClick={editBoxFunc}>Edit</button>
                </div>
                
              </>
              ):(
                <>
                  <input className='inputs' value={editedName} onChange={(e)=>setEditedName(e.target.value)}/>
                  <input className='inputs' value={editedIncome} onChange={(e)=>setEditedIncome(e.target.value)}/>
                  <button className='del-btn' onClick={updateUserFunc}>update</button>
                </>
              )}
            </>
     }  


export default EachItem;
