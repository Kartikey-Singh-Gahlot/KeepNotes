import { useNavigate, Link, Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL } from "./tools";


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
        <main className="h-screen bg-gradient-to-r from-[#0B2B26] to-[#235347]  flex  flex-col text-white overflow-x-hidden">


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
                        <li className="px-2 py-1"><Link to={'/'}>Home</Link></li>
                        <li className="px-2 py-1"><Link to={''}>About</Link></li>
                        <li className="px-2 py-1"><Link to={''}>Contact</Link></li>
                    </ul>
                </nav>
            </header>


            <section className="h-fit w-full flex flex-col justify-between py-10">

                <div className="w-full flex  flex-col justify-center pt-6">
                    <h1 className="w-full text-center md:text-4xl text-2xl px-2">Don’t just write, keep it.</h1>
                    <h6 className="w-full text-center md:text-[10px] text-[8px] px-2 py-3">Keep Notes helps you capture, organize, and access your ideas anytime, anywhere.</h6>
                </div>

                <div className="w-full flex justify-center gap-2 items-center py-1">
                    <img src="/mainBgImage.png" className="h-70"/>
                </div>

                <div className="w-full flex justify-center gap-2 items-center py-2">
                    <h1 className="text-center">Start Noting</h1>
                    <button><Link className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] flex justify-center gap-2 px-5 py-1 rounded-[4px] bg-red-500  text-white  cursor-pointer  whitespace-nowrap" to={`/signup`}>Get Started</Link></button>
                </div>

            </section>


            <section className="h-screen px-4 py-5 flex flex-col justify-center">
                <p className="text-[15px] text-center  w-full">A lightweight, easy-to-use note-taking application designed to help you organize your thoughts, reminders, and ideas in one place.</p>                 
            </section>

        </main>
    )
}