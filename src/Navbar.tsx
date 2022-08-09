import GoogleLoginButton from "./LoginComponents/GoogleLoginButton";
import shell from "./img/whiteShell.png";
import { useNavigate } from "react-router-dom";
import { iTravel } from "./Interface";
import { useUserAuth } from "./LoginComponents/UserAuth";
export default function Navbar(props: {
  toggle: () => void;
  selectedTravel?: iTravel;
}) {
  const navigate = useNavigate();
  const { user: loggedUser } = useUserAuth();

  return (
    <>
      <div className="absolute flex top-0 z-40 min-w-full px-2 md:px-20 py-2 bg-gray-800  justify-between items-center">
        <div className="flex flex-col">
          <img
            className="cursor-pointer"
            src={shell}
            alt=""
            width="40px"
            height="40px"
            onClick={() => navigate("/")}
          />
        </div>
        <GoogleLoginButton toggle={props.toggle} />
      </div>
    </>
  );
}
