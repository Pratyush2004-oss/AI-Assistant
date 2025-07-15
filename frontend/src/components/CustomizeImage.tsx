import Card from "./Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { ImageUp, X } from "lucide-react";

const images = [image1, image2, image3, image4, image5, image6, image7];
function CustomizeImage({
  selectedImage,
  UploadedImage,
  setselectedImage,
  setUploadedImage,
  setbackendImage,
}: {
  selectedImage: string | null;
  UploadedImage: string | undefined;
  setselectedImage: React.Dispatch<React.SetStateAction<any>>;
  setUploadedImage: React.Dispatch<React.SetStateAction<any>>;
  setbackendImage: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <div className="flex justify-center flex-wrap h-[calc(100%-50px)] overflow-auto items-center gap-5 mx-auto p-4 w-[90%] max-md:h-[calc(100%-70px)] max-md:mb-10">
        {images.map((image, index) => (
          <Card
            key={index}
            image={image}
            selectedImage={selectedImage}
            setselectedImage={setselectedImage}
          />
        ))}
        <div
          className={`w-44 md:w-48 h-56 md:h-60 bg-[#030326] border-2 border-[#0000ff7c] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center
            ${
              selectedImage === "input"
                ? "border-4 border-white shadow-2xl shadow-blue-950"
                : ""
            }
            `}
          onClick={() => UploadedImage && setselectedImage("input")}
        >
          {UploadedImage ? (
            <div className="relative w-full h-full">
              <X
                onClick={() => {
                  setUploadedImage(undefined);
                  setselectedImage(null);
                  setbackendImage(undefined);
                }}
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
                <ImageUp className="text-white" size={50} />
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
                  setselectedImage("input");
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomizeImage;
