import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
import { useUserAuth } from "./UserAuth";
// import GoogleButton from "react-google-button";

export default function GoogleLoginButton(props?: { toggle?: () => void, buttonName?:string }) {
  const { googleSignIn, logout, user } = useUserAuth();
  const [isOpeningOverlay, setIsOpeningOverlay] = useState<boolean>(false);
  const { ref } = HandleClickOutsideComponent(setIsOpeningOverlay);
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
      {!user && <div onClick={(e) => handleGoogleSignIn(e)}>{props?.buttonName}</div>}
      {user && (
        <div ref={ref}>
          <div
            className="flex flex-col"
            onClick={() => setIsOpeningOverlay(!isOpeningOverlay)}
          >
            <img
              className="h-10 w-10 rounded-full border "
              src={user.photoURL}
            />
          </div>
          <AnimatePresence>
            {isOpeningOverlay && (
              <motion.div
                //overlay
                className="absolute z-40 flex flex-col justify-evenly items-center border border-amber-400 text-black rounded shadow-2xl top-14 right-1 md:right-[5rem] bg-amber-500"
                initial={{ width: "0px", height: "0px" }}
                animate={{ width: "100px", height: "100px" }}
                exit={{ width: "0px", height: "0px", opacity: 0 }}
              >
                {isOpeningOverlay && (
                  <>
                    <div className="flex flex-col justify-center items-center">
                      <input
                        type="checkbox"
                        className="toggle"
                        onClick={props?.toggle}
                      />
                      <div className="flex text-[0.7rem] -mt-1 justify-center items-center select-none">
                        language it/en
                      </div>
                    </div>
                    <div
                      className="cursor-pointer select-none text-white font-[homeworld-norm] text-[0.9rem]"
                      onClick={handleGoogleLogout}
                    >
                      LOGOUT
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
