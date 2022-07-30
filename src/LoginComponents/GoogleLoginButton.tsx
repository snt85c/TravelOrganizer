import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuth";
// import GoogleButton from "react-google-button";

export default function GoogleLoginButton() {
  const { googleSignIn, logout, user } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {!user && (
        <div
          className="flex text-sm justify-center items-center cursor-pointer text-white font-[homeworld-bold] hover:text-amber-500 duration-300"
          onClick={(e) => handleGoogleSignIn(e)}
        >
          LOGIN
        </div>
      )}
      {user && (
        <>
          <div
            className="flex text-sm justify-center items-center cursor-pointer text-white font-[homeworld-bold] hover:text-amber-500 duration-300"
            onClick={handleGoogleLogout}
          >
            LOGOUT
          </div>
        </>
      )}
    </>
  );
}
