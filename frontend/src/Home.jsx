import { useNavigate, Link, Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL, mobileNavBarStyle} from "./tools";
import Features from "./Features";


export default function Home() {

    const [mobileNavStyle, setMobileNavStyle] = useState(mobileNavBarStyle[0]);

    function trgrMobileNav(){
       if(mobileNavStyle.status==0){
         setMobileNavStyle(mobileNavBarStyle[1]);
       }
       else{
        setMobileNavStyle(mobileNavBarStyle[0]);
       }
    }

    const navigate = useNavigate();

    useEffect(() => {
        let get = async () => {
            let unpValid = await fetch(`${baseURL}/auth/userValidity`, { method: "GET", credentials: "include" });
            let prValid = await unpValid.json();

            if (prValid.status == true) {
                navigate("/notes");
            }
        }
        get();
    }, []);

    return (
        <main className="bg-gradient-to-r from-[#0B2B26] to-[#235347]  flex  flex-col text-white ">


            <header className="sticky top-0 h-fit z-20 backdrop-blur-[4px] shadow-[0px_2px_10px_black] text-white border-[#f5f5f589] px-5 py-2.5 w-full flex justify-between items-center bg-[#0B2B26] ">
                <div className="flex items-center gap-[1px]">
                    <div className="text-4xl">K</div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-[7px] text-left w-full">EEP</h1>
                        <h1 className="text-[7px] text-left w-full">NOTES</h1>
                    </div>
                </div>
                
                <nav className=" flex items-center gap-2 z-10 bg-[#0b2b26]">
                    <ul className={mobileNavStyle.mobileMenuStyle}>
                        
                        <li className="min-[780px]:border-none min-[780px]:w-fit rounded-[10px] w-full border-1 text-center border-amber-50 px-2 py-1"><a href='#home'>Home</a></li>
                        <li className="min-[780px]:border-none min-[780px]:w-fit rounded-[10px] w-full border-1 text-center border-amber-50 px-2 py-1"><a href='#about'>About</a></li>
                        <li className="min-[780px]:border-none min-[780px]:w-fit rounded-[10px] w-full border-1 text-center border-amber-50 px-2 py-1"><a href='#contact'>Contact</a></li>
                    </ul>
                    <div className={mobileNavStyle.hamBurgerMenu} onClick={trgrMobileNav}>
                             <hr className={mobileNavStyle.one}/>
                             <hr className={mobileNavStyle.two}/>
                             <hr className={mobileNavStyle.three}/>
                    </div>
                </nav>
            </header>


            <section className="h-fit w-full flex flex-col justify-between py-10" id="home">

                <div className="w-full flex  flex-col justify-center pt-6">
                    <h1 className="w-full text-center md:text-4xl text-2xl px-2">Don’t just write, keep it.</h1>
                    <h6 className="w-full text-center md:text-[10px] text-[10px] px-2 py-3">Keep Notes helps you capture, organize, and access your ideas anytime, anywhere.</h6>
                </div>

                <div className="w-full flex justify-center gap-2 items-center py-1">
                    <img src="/mainBgImage.png" className="h-70  hover:drop-shadow-[none] drop-shadow-[0px_5px_10px] drop-shadow-black"/>
                </div>

                <div className="w-full flex  justify-center gap-2 items-center py-2">
                    <h1 className="text-center">Start Noting</h1>
                    <button><Link className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] flex justify-center gap-2 px-5 py-1 rounded-[4px] bg-red-500  text-white  cursor-pointer  whitespace-nowrap" to={`/signup`}>Get Started</Link></button>
                </div>

            </section>


            <section className="h-fit px-4 py-5 flex flex-col justify-center" id="about">
                <h1 className="w-full box-border py-3 px-2 text-3xl">About</h1>
                
                <p className="px-2 text-[10px] min-[780px]:text-[15px] ">Keep Notes makes it effortless to organize your thoughts and ideas. Whether it’s a quick note or an important reminder, everything stays just a click away.</p>
            
                <div className="flex py-3 ">
                    <ul className="min-[780px]:flex grid min-[450px]:grid-cols-2  grid-rows-[auto]  w-full justify-around ">
                       <Features featureHeading="Add a new note instantly"  featureImageLink="/addNote.png" />
                       <Features featureHeading="Edit or update notes effortlessly" featureImageLink="/editNote.png" />
                       <Features featureHeading="Delete notes with a single click" featureImageLink="/deleteNote.png" />
                       <Features featureHeading="Access your notes anywhere, anytime" featureImageLink="/accessNote.png" />
                    </ul>
                </div>
                
            </section>


            <section className=" h-fit w-full px-4 py-2 bg-[#0B2B26]" id="contact">
                   <h1 className="w-full text-2xl py-2">Get In Touch</h1>

                    <p className="px-1 text-[10px] min-[780px]:text-[15px] text-left">Your feedback helps us grow and improve. If you have suggestions, feature requests, or want to collaborate, we’re just a message away.</p>

                   <footer className=" h-fit flex flex-col  justify-center">
                       <ul className=" flex w-full justify-center gap-5 py-4">
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSHxjdKGSFjBdMXjKFbqcFvvwmVlJVFZKGtdGBSmmhdpWpmdXpkfkvmzHhWXZSwtTHLckcpq"><img src="/mailIcon.png" className="h-5"/>Email</a></li>
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://www.linkedin.com/in/kartikey-singh-gahlot-58020124b/"><img src="/linkedInIcon.png" className="h-5"/>LinkedIn</a></li>
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://github.com/Kartikey-Singh-Gahlot"><img src="/gitHubIcon.png" className="h-5"/>GitHub</a></li>
                       </ul>
                       <h1 className="w-full text-center text-[10px] py-2 text-gray-400">© 2025 Keep Notes. All rights reserved.</h1>
                   </footer>
            </section>

            

        </main>
    )
}