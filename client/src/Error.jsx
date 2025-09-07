export default function Error(){
    return(
      <div className="h-screen w-full bg-red-30 relative">
           <video src="/errorBgVideo.mp4" autoPlay loop muted className="w-full object-contain">
           </video>
           <h1 className="absolute top-3 text-amber-50">You've been hacked</h1>
      </div>
    );
}