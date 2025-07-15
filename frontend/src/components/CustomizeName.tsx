import { ArrowLeft, MoveLeft } from "lucide-react";

function CustomizeName({
  selectedImage,
  UploadedImage,
  setname,
  name,
  setNextPart,
}: {
  selectedImage: string | null;
  UploadedImage: string | undefined;
  setname: React.Dispatch<React.SetStateAction<any>>;
  name: string | null;
  setNextPart: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    selectedImage && (
      <div className="flex flex-col gap-10 items-center justify-center h-[calc(100%-60px)] relative">
        {/* back button */}
        <button
          className="absolute top-5 left-5 py-2 px-5 cursor-pointer bg-[#0000ff48] rounded-full flex items-center gap-1 text-white"
          onClick={() => setNextPart(false)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* image */}
        <div
          className={`w-56 md:w-72 h-72 md:h-96 bg-[#030326] border-2 border-[#0000ff7c] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white hover:scale-105 transition-all duration-300`}
        >
          <img
            src={selectedImage !== "input" ? selectedImage : UploadedImage}
            alt="assistant"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* input for name */}
        <div className="flex flex-col gap-4 text-white">
          <p className="text-lg font-bold text-center">
            Set name for your assistant
          </p>
          <input 
          type="text"  
          onChange={(e) => setname(e.target.value)} 
          placeholder="Enter your name" 
          className="bg-[#030326] border-2 w-xs sm:w-sm border-[#0000ff7c] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-white hover:scale-105 transition-all duration-300 px-5 py-3 sm:text-lg"
          />
        </div>
      </div>
    )
  );
}

export default CustomizeName;
