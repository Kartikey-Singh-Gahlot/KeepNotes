import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userBoxData, logoData, navBarData, menuBarsData, baseURL } from "./tools";
import "./input.css";

export default function Home(){

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
        navigate("/signin");
      })
    }
  }

  function trgrModify(e){
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

          <div className="w-full flex items-center">
              {/* <img src="/keepNotesLogo.png" className="w-10"/> */}
              <div className="flex flex-col justify-between h-fit p-0.5" onClick={trgrNav}>
                  <hr className={styling.menuBarsStyling.one}/>
                  <hr className={styling.menuBarsStyling.two}/>
                  <hr className={styling.menuBarsStyling.three}/>
              </div>
              <h1 className={styling.logoStyling}>Keep Notes</h1>
                         
          </div>

          <ul className={styling.userBoxStyling}>
              <li className=" hover:bg-[#0B2B26] hover:text-white  box-border gap-1 flex w-full  h-fit py-1  px-2 text-[10px] items-center rounded-2xl"><img src="/userIcon.png"    className="h-5  rounded-2xl p-0.5"/>{userData.userId}</li>
              <li onClick={trgrLogout} className=" hover:bg-[#0B2B26] hover:text-white  box-border gap-1 flex w-full  h-fit py-1  px-2 text-[10px] items-center rounded-2xl" ><img src="/logOutIcon.png"  className="h-5  rounded-2xl p-0.5"/>LogOut</li>
          </ul>             
    </nav>
  

    <main className="flex flex-col h-full w-full"> 
                <section className="sticky top-0 z-10 backdrop-blur-[4px] shadow-[0px_2px_10px_black] text-white border-[#f5f5f589]  py-3.5 w-full flex justify-end items-baseline bg-[#0B2B26]">
                         <h1 className="text-right text-[15px] flex items-center h-full my-0.5 px-5">{`Welcome ${userData.userName}`}</h1>
                </section>

                <section className="h-full flex flex-col px-2 py-2">
                         <div className="w-full flex justify-center py-3">
                            <button type="text" className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-[1px] hover:shadow-none shadow-[0px_2px_10px_black]  rounded-[5px] bg-[#f5f5f589]  text-[black] text-[12px] text-center py-1 px-2 flex gap-1 items-center" onClick={trgrModify} >Add<img src="/addIcon.png"/></button>
                         </div>
                         <ul className="grid min-[780px]:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 py-6  px-2 gap-2 justify-left  box-border relative">
                               {(userData.body.length > 0)?userData.body.map((i)=>{ 
                                return <li className="bg-[url(/credentialsBG.jpg)] bg-cover flex flex-col w-full justify-around px-3 py-4 box-border text-white border-[#ffffff65] border-[1px] gap-5  rounded-2xl" key={i._id}>
                                             <h1 className="w-full text-center">{i.notesTitle}</h1>
                                             <p className="custom-scroll hover:bg-[#0B2B26] hover:text-white rounded-[4px] p-3 bg-[#f5f5f556] backdrop-blur-[3px] text-black  text-[13px] h-[200px] whitespace-pre-wrap break-words overflow-y-scroll shadow-[2px_2px_5px_black] text-ellipsis border-[1px] border-black">
                                                 {i.notesContent}
                                             </p>
                                             <div className="w-full flex justify-around items-center">
                                                   <button className=" hover:bg-[#0B2B26] hover:shadow-none hover:border-amber-50 border-[1px] hover:text-white shadow-[2px_2px_5px_black] text-black bg-[#f5f5f589] text-[12px] px-2 py-1 rounded " onClick={()=>{ trgrDelete(i._id)}}>Delete</button>
                                                   <button className=" hover:bg-[#0B2B26] hover:shadow-none hover:border-amber-50 border-[1px] hover:text-white shadow-[2px_2px_5px_black] text-black bg-[#f5f5f589] text-[12px] px-2 py-1 rounded"><Link to={`/notes/${i._id}`}>Edit</Link></button>
                                             </div>
                                       </li>
                              }):<h1 className="w-full text-center py-4">Nothing to show here</h1>}
                         </ul> 
                </section>
              
    </main>
    
  </div>
 );
}