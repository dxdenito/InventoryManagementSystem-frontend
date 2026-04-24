import { useEffect, useState } from "react"
import api from "../api";

function Test(){
    const [message, setMessage]=useState("");
    const [a, setA]=useState("");
    const [b, setB]=useState("");
    useEffect(()=>{
        api.get('/data').then(res=>setMessage(res.data.message)).catch(error =>console.error("Error fetching data:", error))
    },[])
    const handleCLick = async ()=>{
        try{
           const response =await  api.get('/name')
           alert("Name is: " + response.data.message)
        }catch(error){
            console.log("Failed to fetch name",error)
        }
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const product={a,b}
        try {
           const response = await api.post('/name',product) 
           console.log('success',response.data.sum)
           alert(response.data.sum)

        } catch (error) {
            console.log("Failed to add Products",error)
        }
    }
    
    
    return(
        <div>
            <h1>Fats Api +React</h1>
            <p>Backend says: {message}</p>

            <button onClick={handleCLick}>Get Name</button>

            <form onSubmit={handleSubmit}>
                <input type="number" value={a} onChange={(e)=>setA(e.target.value)}/>
                <input type="number" value={b} onChange={(e)=>setB(e.target.value)}/>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default Test