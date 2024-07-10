const Card = () => {
  return (
    <div className="bg-[#0772b9] w-[30%] text-white rounded-md text-center">
      <h3 className="text-3xl font-bold pt-3">Quiz Title</h3>
      <p className="text-xl p-5">Quiz Score: 80</p>
      <button className="text-lg mb-4 px-2 bg-white text-black rounded-lg">
        Start Quiz
      </button>
    </div>
  );
};

export default Card;
