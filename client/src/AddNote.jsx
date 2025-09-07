import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function AddNote(){

    let [userData, setUserData] = useState({notesTitle:"Untitled", notesContent:""});
    const navigate = useNavigate();

     async function trgrSubmission(e) {
       e.preventDefault();
       let unp = await fetch("http://localhost:8080/notes", { method:"POST", credentials:"include",headers: {"Content-Type": "application/json"}, body:JSON.stringify(userData)});
       let pr = await unp.json();
       if(pr.status){
         setTimeout(()=>{
            alert("Added Successfully");
            navigate("/");
         },1000)
       }
     }

     function trgrChange(e){
       setUserData((prev)=>{
         return {...prev, [e.target.name]: e.target.value};
       })
     }
      
    return(
      <div className="h-screen bg-gradient-to-r from-[#0B2B26] to-[#235347] flex flex-col justify-center items-center">
        
        <div className="box-border p-[8px]  rounded-2xl flex flex-col shadow-2xl text-white border-[#f5f5f542] border-[1px] bg-[url('/credentialsBG.jpg')] bg-cover bg-center ">
          
            <h1 className="w-full  text-2xl text-center py-4">Add A Note</h1>
            
            <div className="bg-[#1e1f1e20] backdrop-blur-[4px] rounded-2xl border-[#f5f5f542] border-[1px]">
                 
                 <form className="flex flex-col justify-center gap-5  px-2 py-4" onSubmit={trgrSubmission}>
                     <input    className="hover:bg-[#0B2B26] hover:text-white rounded-2xl                 bg-[#f5f5f589]  text-[black] text-[12px] text-center py-2 px-2   min-[500px]:w-100 w-[70vw] box-border overflow-clip" autoFocus  onChange={trgrChange} name="notesTitle"  value={userData.notesTitle} placeholder="Enter your title"/>
                     <textarea className="hover:bg-[#0B2B26] hover:text-white rounded-[10px_0px_0px_10px] bg-[#f5f5f589]  text-[black] text-[12px] text-left   p-2  h-50   min-[500px]:w-100 w-[70vw] box-border overflow-y-scroll  whitespace-pre-wrap break-words border-[1px] border-black custom-scroll" onChange={trgrChange} name="notesContent"  value={userData.notesContent} placeholder="Enter your content"/>
                     <div className="w-full flex justify-center">
                          <button   className="hover:bg-[#0B2B26] hover:text-white  px-5 py-1 rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px]" type="submit">Submit</button>
                     </div> 
                 </form>
            </div>
        </div>
          
      </div>
    );
}