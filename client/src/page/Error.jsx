import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  function handleBtn() {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-3">
      <h1 className="text-[200px] font-bold font-serif ">Oops!</h1>
      <p className="font-bold text-xl">404-PAGE NOT FOUND</p>
      <p className="w-80 text-center text-[12px] font-semibold ">
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
      <button
        className="bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold  hover:scale-105 duration-300 "
        onClick={handleBtn}
      >
        GO TO LOGINPAGE
      </button>
    </div>
  );
}

export default Error;
