import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "./tools";

export default function EditNote(){
     const navigate  = useNavigate();
     const { id } = useParams(); 
     let [val, setVal] = useState({notesTitle:"",notesContent:""});

     useEffect(()=>{
       async function get(){
         let unp = await fetch(`${baseURL}/notes/${id}`, {method:"GET", credentials:"include", headers:{"Content-Type": "application/json"} });
         let pr = await unp.json();
         setVal(pr.body);
       }
       get(); 
     },[])

   function trgrChange(e){
        setVal((prev)=>{
            return {...prev, [e.target.name]:e.target.value};
        })
    }

    async function trgrSubmission(e){
        e.preventDefault();
        let inp = await fetch(`${baseURL}/notes/${id}`,{method:"PATCH", credentials:"include", headers:{"Content-Type": "application/json"}, body:JSON.stringify(val)});
        let pr = await inp.json();
        if(pr.status){
            setTimeout(()=>{
              alert("Updated")
              navigate("/");
            },1000)
        }
        else{
           alert(pr.body);
        }
    }

    return(
          <div className="h-screen bg-gradient-to-r from-[#0B2B26] to-[#235347] flex flex-col justify-center items-center">
              
              <div className="box-border p-[8px]  rounded-2xl flex flex-col shadow-2xl text-white border-[#f5f5f542] border-[1px] bg-[url('/credentialsBG.jpg')] bg-cover bg-center ">
       
                   <h1 className="w-full  text-2xl text-center py-4">Edit Notes</h1>

                   <div className="bg-[#1e1f1e20] backdrop-blur-[4px] rounded-2xl border-[#f5f5f542] border-[1px]">
            
                   
                        <form onSubmit={trgrSubmission} className="flex flex-col justify-center gap-5  px-2 py-4">
                               
                               <input    className="hover:bg-[#0B2B26] hover:text-white rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px] text-center py-2 px-2   min-[500px]:w-100 w-[70vw] box-border overflow-clip"  name="notesTitle" value={val.notesTitle} placeholder="Enter your Title" onChange={trgrChange}/>
                               <textarea className="hover:bg-[#0B2B26] hover:text-white rounded-[10px_0px_0px_10px] bg-[#f5f5f589]  text-[black] text-[12px] text-left  p-2   h-50   min-[500px]:w-100 w-[70vw] box-border overflow-y-scroll  whitespace-pre-wrap break-words border-[1px] border-black custom-scroll"  name="notesContent" value={val.notesContent} onChange={trgrChange}/>    
                               
                               <div className="w-full flex justify-center">
                                   <button type="submit" className="hover:bg-[#0B2B26] hover:text-white  px-5 py-1 rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px]">Submit</button>
                               </div>
                        </form>      
                  </div>
              </div>
         </div>
        
    )
}