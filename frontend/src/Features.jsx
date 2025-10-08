export default function Features({featureHeading, featureImageLink}){
    return (
       <li className="flex flex-col items-center px-2 py-2">
           <img src={featureImageLink} alt="" className="w-50" />
           <h1 className="hover:bg-[#0B2B26] hover:text-white hover:border-amber-50 border-black border-[1px] flex justify-center gap-2 px-5 py-1 rounded-[4px] bg-red-500  text-white  cursor-pointer  whitespace-nowrap">{featureHeading}</h1>
       </li>
    )
}