import { useEffect } from "react";
import { useUserAuth } from "./UserAuth";
// import GoogleButton from "react-google-button";

export default function GoogleLoginButton() {
  const { googleSignIn, logout, user } = useUserAuth();

  const handleGoogleSignIn = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!user && (
        <div
          className="flex justify-center items-center cursor-pointer text-white"
          onClick={(e) => handleGoogleSignIn(e)}
        >
          login
        </div>
      )}
      {user && (
        <>
          <div
            className="flex justify-center items-center cursor-pointer text-white"
            onClick={() => logout()}
          >
            logout
          </div>
        </>
      )}
    </>
  );
}
