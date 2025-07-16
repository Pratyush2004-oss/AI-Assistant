import { useState } from "react";
import CustomizeImage from "../components/CustomizeImage";
import CustomizeName from "../components/CustomizeName";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function CustomizePage() {
  const [UploadedImage, setUploadedImage] = useState<string | undefined>();
  const [selectedImage, setselectedImage] = useState<string | null>(null);
  const [backendImage, setbackendImage] = useState<string | File | undefined>();
  const [nextPart, setNextPart] = useState(false);
  const [loading, setloading] = useState(false);
  const [name, setname] = useState<string | null>(null);
  const { updateAssistant } = useAuthStore();
  const navigate = useNavigate();

  const handleUpload = () => {
    setNextPart(true);
  };

  const handleSubmit = async () => {
    setloading(true);
    try {
      if (!name) {
        toast.error("Please enter a name");
        return;
      }
      const formData = new FormData();
      formData.append("assistantName", name);
      if (backendImage) formData.append("assistantImage", backendImage as File);
      else formData.append("imageUrl", selectedImage as string);

      // calling the function and API
      const res = await updateAssistant(formData);
      if (res) navigate("/");
    } catch (error) {
      toast.error("Error updating user, please try again");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#020253] overflow-auto pb-10">
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 font-semibold px-4 py-2 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center gap-1"
      >
        <ArrowLeft size={18} />
      </button>
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
      {selectedImage && nextPart && name ? (
        <button
          onClick={handleSubmit}
          disabled={loading || !name}
          className=" sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 w-xs to-blue-500 font-semibold text-lg px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center"
        >
          {loading ? (
            <Spiral size={25} color="white" />
          ) : (
            "Create your Assistant"
          )}
        </button>
      ) : selectedImage && !nextPart ? (
        <button
          onClick={nextPart ? handleSubmit : handleUpload}
          className=" sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 w-xs to-blue-500 font-semibold text-lg px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center"
        >
          {loading ? <Spiral size={25} color="white" /> : "Next"}
        </button>
      ) : null}
    </div>
  );
}

export default CustomizePage;
