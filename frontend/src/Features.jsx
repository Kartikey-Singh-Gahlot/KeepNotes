export default function Features({featureHeading, featureImageLink}){
    return (
       <li className="flex flex-col items-center px-2 py-2 hover:bg-[#0B2B26] hover:border-amber-50 border-[1px] border-[#00000000] rounded-2xl ">
           <img src={featureImageLink} alt="" className="min-[780px]:w-40 w-30 hover:drop-shadow-[none] drop-shadow-[0px_5px_10px] drop-shadow-black" />
           <h1 className="flex w-fit gap-2 px-5 py-1 rounded-[4px] text-[12px]  text-white  cursor-pointer  whitespace-nowrap">{featureHeading}</h1>
       </li>
    )
}