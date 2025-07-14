function Card({ image }: { image: string }) {
  return (
    <div className="w-44 md:w-48 h-56 md:h-60 bg-[#030326] border-2 border-[#0000ff7c] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white hover:scale-105 transition-all duration-300">
      <img
        src={image}
        alt="assistant"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}

export default Card;
