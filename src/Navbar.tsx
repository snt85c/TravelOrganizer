import GoogleLoginButton from "./LoginComponents/GoogleLoginButton";
import shell from "./img/whiteShell.png";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
 const navigate = useNavigate()
  return (
    <>
      <div className="absolute flex top-0 z-20 min-w-full px-2 md:px-20 py-2 bg-gray-800  justify-between items-center">
        <img className="cursor-pointer" src={shell} alt="" width="40px" height="40px" onClick={()=>navigate("/")} />
        <GoogleLoginButton />
      </div>
    </>
  );
}
