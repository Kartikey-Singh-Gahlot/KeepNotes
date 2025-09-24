import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseURL } from "../tools";



export default function SignIn(){

 let [formData, setFormData] = useState({email:"", password:""});
 let [passStat, setPassStat] = useState({type:"password", status:"Show Password", src:"/eyeOpenIcon.png"})
 const navigate = useNavigate();

 function trgrChange(e){
   e.preventDefault();
   setFormData((prev)=>{
     return {...prev,[e.target.name]:e.target.value};
   })
 }

 async function trgrSubmission(e){
   e.preventDefault();
   let unp = await fetch(`${baseURL}/auth/signin`, { method:"POST", credentials: "include",  headers:{"Content-Type": "application/json"}, body: JSON.stringify(formData)});
   let pr = await unp.json();
   alert(pr.body);
   if(pr.status){
    setTimeout(()=>{
      navigate("/notes");
    },1000)
   }
 }
 
  useEffect(()=>{
      let get = async ()=>{
        let unp = await fetch(`${baseURL}/auth/userValidity`, {method:"GET", credentials:"include"});
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
        return {...prev,type:"text",status:"Hide Password",src:"/eyeCloseIcon.png"};
      });
    }
    else{
      setPassStat((prev)=>{
        return {...prev,type:"password",status:"Show Password",src:"/eyeOpenIcon.png"};
      });
    }
  }


 return(
<div className="h-screen bg-gradient-to-r from-[#0B2B26] to-[#235347] gap-25 flex flex-col items-center">

         <header className=" fixed w-full h-20 text-white px-2 py-2">
                <Link to={'/'} className="flex items-center gap-[1px]">
                      <div className="text-4xl">K</div>
                      <div className="flex flex-col items-center">
                           <h1 className="text-[7px] text-left w-full">EEP</h1>
                           <h1 className="text-[7px] text-left w-full">NOTES</h1>
                      </div>
                 </Link>
         </header>
        
         <main className="h-full flex flex-col items-center justify-center">
               <div className="box-border p-[8px]  rounded-2xl flex flex-col shadow-2xl text-white border-[#f5f5f542] border-[1px] bg-[url('/credentialsBG.jpg')] bg-cover bg-center ">        
                    <h1 className="w-full  text-2xl text-center py-4">Login Page</h1>
                   <div className="bg-[#1e1f1e20] backdrop-blur-[4px] rounded-2xl border-[#f5f5f542] border-[1px]">
                        <form className="flex flex-col justify-center gap-3 px-2 py-4" onSubmit={trgrSubmission}>  
                              <div className="w-full flex flex-col gap-5">
                                   <div className="flex flex-col">
                                       <label htmlFor="email" className="text-[10px] flex  items-center gap-1"><img src="/emailWhiteIcon.png" className="h-3.5"/>Email</label>
                                       <input id="email" className=" hover:bg-[#0B2B26] hover:text-white rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px] text-center py-2 px-2   min-[500px]:w-100 w-[70vw] box-border overflow-clip" name="email"    type="email"    onChange={trgrChange} value={formData.email} placeholder="xyz@gmail.com"/>
                                   </div>
                                   <div className="flex flex-col">
                                       <label htmlFor="password" className="text-[10px] flex  items-center gap-1"><img src="/passwordWhiteIcon.png" className="h-3.5"/>Password</label>
                                       <input  id="password"  className=" hover:bg-[#0B2B26] hover:text-white rounded-2xl bg-[#f5f5f589]  text-[black] text-[12px] text-center py-2 px-2   min-[500px]:w-100 w-[70vw] box-border overflow-clip" name="password" type={passStat.type} onChange={trgrChange} value={formData.password} placeholder="must be 8 characterers long"/>
                                   </div>
                              </div>
                              <div className="w-full flex justify-left py-2">
                                   <div className="flex justify-center gap-1 items-center cursor-pointer" onClick={trgrShowPass}>
                                       <img src={passStat.src} className="h-3.5"/>
                                       <h1 className="underline text-[10px] cursor-pointer" >{passStat.status}</h1>
                                   </div>  
                              </div>
                              <div className="w-full flex flex-col gap-3">
                                  <button className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] bg-red-500 py-2 rounded-[4px]text-white text-[12px] cursor-pointer" type="submit">Login</button>
                                  <h1 className="text-[10px] w-full text-left">
                                    Don't have an account ? <Link className="underline px-1" to={"/signup"}>Create One </Link>
                                  </h1>
                              </div>
                        </form>
                    </div>
               </div>
         </main>
</div>
 );
}