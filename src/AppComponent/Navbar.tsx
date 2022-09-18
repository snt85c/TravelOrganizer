import GoogleLoginButton from "../LoginComponents/GoogleLoginButton";
import { TiHomeOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { iTravel } from "../Interface";
import { useUserAuth } from "../LoginComponents/UserAuth";
export default function Navbar(props: {
  toggle: () => void;
  selectedTravel?: iTravel;
}) {
  const navigate = useNavigate();
  const { user: loggedUser } = useUserAuth();

  return (
    <>
      <div className="absolute flex top-0 z-40 min-w-full px-2 md:px-20 py-2 bg-gray-800  justify-between items-center">
        <div 
        onClick={() => navigate("/")}
        className="flex flex-col h-10 w-10 cursor-pointer">
          {/* <img
            className="cursor-pointer"
            src={shell}
            alt=""
            width="40px"
            height="40px"
            onClick={() => navigate("/")}
          /> */}
          <TiHomeOutline size={40} />
        </div >
        <GoogleLoginButton toggle={props.toggle} />
      </div>
    </>
  );
}
