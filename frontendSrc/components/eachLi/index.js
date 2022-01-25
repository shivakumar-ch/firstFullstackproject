import { useEffect,useState } from 'react'
import './index.css'
import {delUsers,getUsers,addUser} from "../../mySlice"
import {useDispatch} from "react-redux"

function EachItem(props) {
  const{data} = props
  const {_id,name,income}=data

  const dispatch = useDispatch()
  const [editedName, setEditedName] = useState('');
  const [editedIncome, setEditedIncome] = useState('');
  const [showEditBox, toggleEditedBox] = useState(true);

  useEffect(()=>{
    setEditedName(name)
    setEditedIncome(income)
  },[showEditBox,name,income])
 
    const delData=async()=>{
          dispatch(delUsers(_id))
          dispatch(getUsers())
      }
    
    const editFunc=()=>{
      toggleEditedBox(!showEditBox)
    }

    const updateUser=()=>{
      // dispatch(updateUser({id:_id,name:editedName,income:editedIncome}))
      editFunc()
    }

    return  <>
              {showEditBox ? (
              <>
                <p className='name-para'>{name}</p>
                <p className='income-para'>{income}</p>
                <div>
                  <button onClick={delData} className='del-btn'>del</button>
                <button onClick={editFunc}>Edit</button>
                </div>
                
              </>
              ):(
                <>
                  <input value={editedName} onChange={(e)=>setEditedName(e.target.value)}/>
                  <input value={editedIncome} onChange={(e)=>setEditedIncome(e.target.value)}/>
                  <button onClick={updateUser}>update</button>
                </>
              )}
            </>
     }  


export default EachItem;
