import { useNavigate } from "react-router-dom";

const Default = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 ">
        <div
          className="w-full border border-slate-100 h-[150px] rounded-2xl p-8 cursor-pointer shadow-xl"
          onClick={() => navigate("innovations")}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Total Innovations
          </h1>
          <div className="text-2xl font-extrabold">10</div>
        </div>
      </div>
    </div>
  );
};

export default Default;
