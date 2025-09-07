import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function SignIn(){

 let [formData, setFormData] = useState({email:"", password:""});
 let [passStat, setPassStat] = useState({type:"password", status:"Show"})
 const navigate = useNavigate();

 function trgrChange(e){
   e.preventDefault();
   setFormData((prev)=>{
     return {...prev,[e.target.name]:e.target.value};
   })
 }

 async function trgrSubmission(e){
   e.preventDefault();
   let unp = await fetch("http://localhost:8080/auth/signin", { method:"POST", credentials: "include",  headers:{"Content-Type": "application/json"}, body: JSON.stringify(formData)});
   let pr = await unp.json();
   alert(pr.body);
   if(pr.status){
    setTimeout(()=>{
      navigate("/");
    },1000)
   }
 }
 
  useEffect(()=>{
      let get = async ()=>{
        let unp = await fetch("http://localhost:8080/auth/userValidity", {method:"GET", credentials:"include"});
        let pr = await unp.json();

        if(pr.status){
           navigate("/");
        }
      }
      get();
  },[])

  function trgrShowPass(){
    if(passStat.type=="password"){
      setPassStat((prev)=>{
        return {...prev,type:"text",status:"Hide"};
      });
    }
    else{
      setPassStat((prev)=>{
        return {...prev,type:"password",status:"Show"};
      });
    }
  }


 return(
<div className="h-screen bg-gradient-to-r from-[#0B2B26] to-[#235347] justify-center flex flex-col items-center">

   
        <div className="box-border p-[8px]  rounded-2xl flex flex-col shadow-2xl text-white border-[#f5f5f542] border-[1px] bg-[url('/credentialsBG.jpg')] bg-cover bg-center ">     
            
             <h1 className="w-full  text-2xl text-center py-4">Login Page</h1>

            <div className="bg-[#1e1f1e20] backdrop-blur-[4px] rounded-2xl border-[#f5f5f542] border-[1px]">
               

                 <form className="flex flex-col justify-center gap-5  px-2 py-4" onSubmit={trgrSubmission}>  
                       <input  className=" hover:bg-[#0B2B26] hover:text-white rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px] text-center py-2 px-2   min-[500px]:w-100 w-[70vw] box-border overflow-clip" name="email"    type="email"    onChange={trgrChange} value={formData.name} placeholder="Email"/>
                       <input  className=" hover:bg-[#0B2B26] hover:text-white rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px] text-center py-2 px-2   min-[500px]:w-100 w-[70vw] box-border overflow-clip" name="password" type={passStat.type} onChange={trgrChange} value={formData.password} placeholder="Password"/>
                       
                       <h1 className="px-2 w-full underline text-[12px]" onClick={trgrShowPass}>{passStat.status}</h1>
                       
                       <div className="w-full flex justify-around">
                           <button className="hover:bg-[#0B2B26] hover:text-white  px-5 py-1 rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px]" type="submit">Submit</button>
                           <Link to={"/signup"}>
                               <button className="hover:bg-[#0B2B26] hover:text-white px-5 py-1 rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px]" type="button">SignUp</button>
                           </Link>
                       </div>
                 </form>
             </div>
        </div>
</div>
 );
}