import { useState } from "react";
import CustomizeImage from "../components/CustomizeImage";
import CustomizeName from "../components/CustomizeName";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";
function CustomizePage() {
  const [UploadedImage, setUploadedImage] = useState<string | undefined>();
  const [selectedImage, setselectedImage] = useState<string | null>(null);
  const [backendImage, setbackendImage] = useState<string | File | undefined>();
  const [nextPart, setNextPart] = useState(false);
  const [loading, setloading] = useState(false);
  const [name, setname] = useState<string | null>(null);

  const handleUpload = () => {
    setNextPart(true);
  };

  const handleSubmit = () => {
    setloading(true);
    try {
      console.log(selectedImage, name);
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#020253] overflow-auto pb-10">
      {!nextPart ? (
        <CustomizeImage
          selectedImage={selectedImage}
          UploadedImage={UploadedImage}
          setselectedImage={setselectedImage}
          setUploadedImage={setUploadedImage}
          setbackendImage={setbackendImage}
        />
      ) : (
        <CustomizeName
          selectedImage={selectedImage}
          UploadedImage={UploadedImage}
          setname={setname}
          name={name}
          setNextPart={setNextPart}
        />
      )}
      {selectedImage && (
        <button
          onClick={nextPart ? handleSubmit : handleUpload}
          className=" sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 w-xs to-blue-500 font-semibold text-lg px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center"
        >
          {loading ? (
            <Spiral size={25} color="white" />
          ) : nextPart ? (
            "Finish "
          ) : (
            "Next"
          )}
        </button>
      )}
    </div>
  );
}

export default CustomizePage;
