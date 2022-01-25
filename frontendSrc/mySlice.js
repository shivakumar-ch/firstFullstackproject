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
        try{
          const response = await fetch(url,options)
          const res = await response.json()
          console.log(res,'user deleted')
          alert("Proceed to Delete User?")
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

        // // adding user

        // [addUser.pending]:(state)=>(console.log("pending")),
        // [addUser.fulfilled]:(state,{payload})=>(console.log("successs",payload)),
        // [addUser.rejected]:(state)=>(console.log("fail")),

        // // del user

        // [delUsers.pending]:(state)=>(console.log("pending")),
        // [delUsers.fulfilled]:(state,{payload})=>(console.log("successs",payload)),
        // [delUsers.rejected]:(state)=>(console.log("fail"))
    }
})

export default usersSlice.reducer