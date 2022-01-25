import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("usersSlice/getUsers",async()=>{
    try{
        const response=await fetch("http://localhost:3001/income")
        const data = await response.json()
        return data
    }catch(err){
        console.timeLog(err)
    }
})

export const addUser = createAsyncThunk("usersSlice/addUser",async({name,income})=>{
    const data={name,income}
     console.log(data,'daaaaaaaaaaa')
      const url='http://localhost:3001/income/add'
      const options={
        method: 'POST',    
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      }
      try{
        const response = await fetch(url,options)
      console.log(response)
      const res = await response.json()
      console.log(res,'user added')
      return res
      }catch(err){
        console.log(err)
      }
})

export const updateUser = createAsyncThunk("usersSlice/updateUser",async(data)=>{

    const url='http://localhost:3001/income/update'
    const options={
      method: 'PUT',    
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    }
    console.log(options,"op async")
    try{
      const response = await fetch(url,options)
    console.log(response)
    const res = await response.json()
    console.log(res,'user added')
    
    }catch(err){
      console.log(err)
    }
})

export const updateAllUsers = createAsyncThunk("usersSlice/updateAllUsers",async(data)=>{

  const url='http://localhost:3001/income/updateall'
  const options={
    method: 'PUT',    
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({usersLi:data})
  }
  console.log(options,"updateall")
  try{
    const response = await fetch(url,options)
  console.log(response)
  const res = await response.json()
  console.log(res,'user added')
  return res
  }catch(err){
    console.log(err)
  }
})

export const delUsers = createAsyncThunk("usersSlice/delUsers",async id=>{
 
    const url=`http://localhost:3001/income/del/?id=${id}`
        console.log(url,"url")
        const options={
          method: 'DELETE'
        }
        alert("Proceed to Delete User?")
        try{
          const response = await fetch(url,options)
          const res = await response.json()
          console.log(res,'user deleted')
          
        }catch(err){
          console.log(err)
        }
})

const initialState={
    usersList:[],
    apiStatus:null
}

export const usersSlice = createSlice({
    name:"usersSlice",
    initialState,
    extraReducers:{
        [getUsers.pending]:(state)=>({
            ...state,
            apiStatus:"LOADING"
        }),
        [getUsers.fulfilled]:(state,{payload})=>({
            usersList:[...payload],
            apiStatus:"SUCCESS"
        }),
        [getUsers.rejected]:(state)=>({
            ...state,
            apistatus:"FAILED"
        }),

        [addUser.pending]:(state)=>(console.log("pending")),
        [addUser.fulfilled]:(state,{payload})=>({
          ...state,
          usersList:[...state.usersList,payload.createdUser]
        }),
        [addUser.rejected]:(state)=>(console.log("fail")),

        [updateAllUsers.pending]:(state)=>(console.log("pending")),
        [updateAllUsers.fulfilled]:(state,{payload})=>({
          ...state,
          usersList:[...payload.response]
        }),
        [updateAllUsers.rejected]:(state)=>(console.log("fail"))
    }
})

export default usersSlice.reducer