import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userBoxData, logoData, navBarData, menuBarsData, baseURL } from "./tools";
import "./input.css";

export default function Note(){

 const [userData, setUserData] = useState({body:[], status:"",  userId:"", userName:""})
 const [styling, setStyling] = useState({status:0, userBoxStyling:userBoxData[0], logoStyling:logoData[0], navBarStyling: navBarData[0], menuBarsStyling: menuBarsData[0]});
 const navigate = useNavigate();

 
  useEffect(()=>{
      let get = async ()=>{
        let unpValid = await fetch(`${baseURL}/auth/userValidity`, {method:"GET", credentials:"include"});
        let prValid = await unpValid.json();

        if(prValid.status==false){
           navigate("/signup");
        }
        else{
         let unp = await fetch(`${baseURL}/notes`, {method:"GET", credentials:"include"});
         let pr = await unp.json();
         setUserData(pr);
        }
      }
      get();
  },[navigate]);

  async function trgrDelete(id){
    let unp = await fetch(`${baseURL}/notes/${id}`, {method:"DELETE", credentials:"include"});
    let pr = await unp.json();
    if(pr.status){
      alert(pr.body);
      navigate("/signup");
    }
  }

  async function trgrLogout(){
    let unp = await fetch(`${baseURL}/auth/signout`, {method:"POST", credentials:"include"});
    let pr = await unp.json();
    if(pr.status){
      setTimeout(()=>{
        alert("Logging Out");
        navigate("/");
      })
    }
  }

  function trgrAdd(e){
    navigate("/notes/new")
  }

  function trgrNav(){
    if(styling.status==0){
      setStyling((prev)=>{
        return {...prev,userBoxStyling:userBoxData[1],logoStyling:logoData[1],navBarStyling:navBarData[1], menuBarsStyling:menuBarsData[1],status:1};
      })
     
    }
    else{
      setStyling((prev)=>{
        return {...prev,userBoxStyling:userBoxData[0],logoStyling:logoData[0],navBarStyling:navBarData[0],menuBarsStyling:menuBarsData[0],status:0};
      })

    }
  }

 return(
  <div className="h-screen bg-gradient-to-r from-[#0B2B26] to-[#235347]  flex  text-white overflow-x-hidden">

    <nav className={styling.navBarStyling}>   

          <div className="w-full flex items-center justify-between px-2">
             
               <div className={`${styling.logoStyling}`}>
                      <div className="text-4xl">K</div>
                      <div className="flex flex-col items-center">
                           <h1 className="text-[7px] text-left w-full">EEP</h1>
                           <h1 className="text-[7px] text-left w-full">NOTES</h1>
                      </div>
              </div>
              <div className="flex flex-col justify-between h-fit p-0.5" onClick={trgrNav}>
                  <hr className={styling.menuBarsStyling.one}/>
                  <hr className={styling.menuBarsStyling.two}/>
                  <hr className={styling.menuBarsStyling.three}/>
              </div>
                         
          </div>


          <div className={styling.userBoxStyling}>
              <ul className="flex flex-col w-full py-1.5 justify-between px-1 shadow-[1px_1px_5px_black] rounded-[4px] bg-[#f5f5f589] text-black border-[1px]">
                  <li className=" hover:underline underline-offset-2 border-[1px] border-[#ffffff00]  box-border  gap-1 flex w-full  h-fit py-1  px-2 text-[10px] items-center rounded-2xl"><img src="/userIcon.png"    className="h-5  rounded-2xl p-0.5"/>{userData.userId}</li>
                  <li className=" hover:underline underline-offset-2 border-[1px] border-[#ffffff00]  box-border  gap-1 flex w-full  h-fit py-1  px-2 text-[10px] items-center rounded-2xl"><img src="/editBlackIcon.png"    className="h-5  rounded-2xl p-0.5"/><Link to="/Profile">Edit Profile</Link></li>
                    
              </ul>

              <ul className="w-full flex flex-col justify-center items-center gap-3 h-full ">
                 <li className="flex items-center"><Link to="/" className="w-full flex items-center">Home</Link></li>
                 <li className="w-full text-center"><Link to="/Feed">Feed</Link></li>
              </ul>

            
              <button className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] flex justify-center gap-2 px-1 py-2 rounded-[4px] bg-red-500  text-white text-[12px]  cursor-pointer" onClick={trgrLogout} type="submit"><img src="/logOutIcon.png" className="h-5"/>Log Out</button>        
             
          </div>             
    </nav>
  

    <main className="flex flex-col h-full w-full"> 
                <header className="sticky top-0 z-10 backdrop-blur-[4px] shadow-[0px_2px_10px_black] text-white border-[#f5f5f589]  py-3.5 w-full flex justify-end items-baseline bg-[#0B2B26]">
                         <h1 className="text-right text-[15px] flex items-center h-full my-0.5 px-5">{`Welcome ${userData.userName}`}</h1>
                </header>

                <section className="h-full flex flex-col px-2 py-2">
                         <div className="w-full flex justify-center py-3">
                            <button type="text" className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] flex justify-center gap-2 px-3 py-1 rounded-[4px] bg-red-500  text-white   items-center cursor-pointer" onClick={trgrAdd} ><img src="/addIcon.png" className="h-5"/>Add</button>
                         </div>
                         <ul className="grid min-[780px]:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 py-6  px-2 gap-5 justify-left  box-border relative">
                               {(userData.body.length > 0 )?userData.body.map((i)=>{ 
                                return <li className=" bg-[url(/credentialsBG.jpg)] bg-cover flex flex-col w-full justify-around px-3 py-4 box-border text-white border-[#ffffff65] border-[1px] gap-5  rounded-2xl shadow-[0px_5px_10px_black] " key={i._id}>
                                            <div className="w-full flex">
                                                 <h1 className="w-full text-center text-[20px]">{i.notesTitle}</h1>
                                                 <Link className="hover:scale-125 flex items-center justify-center gap-2" to={`/notes/${i._id}`}><img className="h-5" src="/editWhiteIcon.png"/></Link>
                                            </div>

                                             <p className="bg-[#0B2B26] backdrop-blur-[2px] underline-offset-2 underline custom-scroll  p-3 text-[13px] h-[200px] whitespace-pre-wrap break-words overflow-y-scroll text-ellipsis border-[#ffffff84] border-[1px] shadow-[0px_5px_10px_black] rounded-2xl">
                                                 {i.notesContent}
                                             </p>

                                             <ul className="w-full flex">
                                                   <li className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] bg-red-500 text-[15px]  cursor-pointer flex w-full items-center justify-center gap-2 px-2 py-1 rounded-[4px] shadow-[0px_2px_10px_black]" onClick={()=>{ trgrDelete(i._id)}}><img src="/deleteIcon.png" className="h-4"/>Delete</li>
                                             </ul>
                                       </li>
                              }):<h1 className="w-full text-center py-4">Nothing to show here</h1>}
                         </ul> 
                </section>
              
    </main>
    
  </div>
 );
}