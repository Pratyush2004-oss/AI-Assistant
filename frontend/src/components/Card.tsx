function Card({
  image,
  setselectedImage,
  selectedImage,
}: {
  image: string;
  selectedImage: string | null;
  setselectedImage: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <div
      className={`w-44 md:w-48 h-56 md:h-60 bg-[#030326] border-2 border-[#0000ff7c] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white hover:scale-105 transition-all duration-300
        ${selectedImage === image ? "border-4 border-white shadow-2xl shadow-blue-950" : ""}
        `}
      onClick={() => setselectedImage(image)}
    >
      <img
        src={image}
        alt="assistant"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}

export default Card;
