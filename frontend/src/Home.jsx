import { useNavigate, Link, Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL } from "./tools";
import Features from "./Features";


export default function Home() {

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
        <main className="bg-gradient-to-r from-[#0B2B26] to-[#235347]  flex  flex-col text-white overflow-x-hidden">


            <header className="sticky h-fit top-0 z-10 backdrop-blur-[4px] shadow-[0px_2px_10px_black] text-white border-[#f5f5f589] px-5 py-2.5 w-full flex justify-between items-center bg-[#0B2B26] ">
                <div className="flex items-center gap-[1px]">
                    <div className="text-4xl">K</div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-[7px] text-left w-full">EEP</h1>
                        <h1 className="text-[7px] text-left w-full">NOTES</h1>
                    </div>
                </div>
                <nav className="flex gap-2">
                    <ul className="flex justify-around">
                        <li className="px-2 py-1"><a href='#home'>Home</a></li>
                        <li className="px-2 py-1"><a href='#about'>About</a></li>
                        <li className="px-2 py-1"><a href='#contact'>Contact</a></li>
                    </ul>
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
                <h1 className="w-full box-border py-3 px-2 text-3xl">About Us</h1>
                
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


            <section className=" h-fit w-full pt-10 pb-1" id="contact">
                    <h1 className="w-full box-border py-3 px-2 text-3xl">Get In Touch</h1>
                    <p className="w-full box-border py-4 px-2 text-[15px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi culpa ratione praesentium dolor eaque perferendis quod officiis natus harum porro deserunt, ea nihil? Officiis enim temporibus repudiandae a, ipsam saepe molestiae eius doloribus odit architecto cum autem numquam earum iure, sint porro harum excepturi nesciunt placeat minima? Cum, similique atque?</p>

                   <footer className=" h-ft flex flex-col  bg-[#0B2B26] justify-center">
                       <ul className=" flex w-full justify-center gap-2">
                          <li>Email</li>
                          <li>GitHub</li>
                       </ul>
                   </footer>
            </section>

            

        </main>
    )
}