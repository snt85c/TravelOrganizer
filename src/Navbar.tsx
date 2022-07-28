import GoogleLoginButton from "./LoginComponents/GoogleLoginButton";
import shell from "./img/whiteShell.png";
import { useNavigate } from "react-router-dom";
export default function Navbar(props: { toggle: () => void , selectedTravel:String}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute flex top-0 z-20 min-w-full px-2 md:px-20 py-2 bg-gray-800  justify-between items-center">
        <div className="flex flex-col">

        <img
          className="cursor-pointer"
          src={shell}
          alt=""
          width="40px"
          height="40px"
          onClick={() => navigate("/")}
          />
          <div className="text-[0.5rem]">{props.selectedTravel}</div>
          </div>
        <GoogleLoginButton />
        <div className="flex flex-col">
          <input type="checkbox" className="toggle" onClick={props.toggle} />
          <div className="flex text-[0.7rem] -mt-[3px] justify-center items-center select-none">
            lang
          </div>
        </div>
      </div>
    </>
  );
}
