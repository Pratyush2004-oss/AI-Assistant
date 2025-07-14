import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";

const images = [image1, image2, image3, image4, image5, image6, image7];
function CustomizePage() {
  const [UploadedImage, setUploadedImage] = useState<string | undefined>();
  const [backendImage, setbackendImage] = useState<string | File | undefined>();
  const [loading, setloading] = useState(false);
  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#020253] overflow-auto pb-20">
      <div className="flex justify-center flex-wrap h-full items-center overflow-auto gap-5 mx-auto p-4 w-[90%]">
        {images.map((image, index) => (
          <Card key={index} image={image} />
        ))}
        <div className="w-44 md:w-48 h-56 md:h-60 bg-[#030326] border-2 border-[#0000ff7c] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center">
          {UploadedImage ? (
            <div className="relative w-full h-full">
              <X
                onClick={() => setUploadedImage(undefined)}
                className="absolute top-0.5 right-0.5 cursor-pointer bg-red-500 rounded-se-lg p-1 text-white"
              />
              <img
                src={UploadedImage}
                alt="assistant"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ) : (
            <>
              <label
                htmlFor="upload"
                className="flex flex-col items-center gap-2"
              >
                <Upload className="text-white" size={50} />
                <span className="text-white font-bold text-lg">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="upload"
                className="hidden"
                onChange={(e) => {
                  setUploadedImage(URL.createObjectURL(e.target.files![0]));
                  setbackendImage(e.target.files![0]);
                }}
              />
            </>
          )}
        </div>
      </div>
      <button
        type="submit"
        className=" sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 w-xs to-blue-500 font-semibold text-lg px-8 py-2 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <Spiral size="20" speed="0.9" color="white" /> : "Next"}
      </button>
    </div>
  );
}

export default CustomizePage;
