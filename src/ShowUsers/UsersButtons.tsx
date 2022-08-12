import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../LangContextProvider";
import { iTravel, iTravelData } from "../Interface";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
import { AnimatePresence, motion } from "framer-motion";

export default function UserButton(props: {
  travel: iTravel;
  user?: iTravelData;
  users?: iTravelData[];
  loggedUser: any;
  isWatching: boolean;
  setUser: React.Dispatch<any>;
  setOtherUser: React.Dispatch<React.SetStateAction<iTravelData>>;
}) {
  const [showOther, setShowOther] = useState<boolean>(false);
  const navigate = useNavigate();
  const lang = useContext(LangContext);
  const { ref } = HandleClickOutsideComponent(setShowOther)

  useEffect(() => {
    if (props.travel.id !== 0) setShowOther(true);
  }, [props.travel]);

  const handleClickSelection = (user: iTravelData) => {
    if (props.loggedUser && !props.isWatching) {
      // && props.user
      if (user.userInfo.uid !== props.loggedUser?.uid) {
        props.setOtherUser(user);
        navigate("/other");
      } else {
        props.setUser(user);
        navigate("/user");
      }
    } else {
      props.setOtherUser(user);
      navigate("/other");
    }
    setShowOther(false);
  };

  let usersList = props.users?.map((user, i) => {
    return (
      <div
        className="flex rounded-md bg-gradient-to-r from-amber-700 to-amber-500 px-4 gap-2 w-[90%] mt-1 justify-between font-[homeworld-norm] hover:text-black duration-300 items-center cursor-pointer select-none"
        key={i}
        onClick={() => handleClickSelection(user)}
      >
        {user?.userInfo.displayName.toUpperCase()}
        <img
          src={user?.userInfo.photoURL}
          className="w-10 h-10 rounded-full select-none"
        />
      </div>
    );
  });

  let userListLenght: number = usersList ? usersList?.length * 50 : 0
  return (
    <>
      <div
        ref={ref}
        className="flex flex-row justify-between mx-2 md:mx-20 select-none">
        <button
          className="flex z-30 rounded-md shadow-lg mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          onClick={() => {
            setShowOther(!showOther);
          }}
        >
          {"travellers"}
        </button>
        {props.travel.id !== 0 && (
          <div className="flex flex-col justify-center items-center  font-[phonk] text-[1.1rem] text-gray-800 z-20 ">
            <span className="font-[homeworld-norm] select-none">
              // {props.travel.id}XX
            </span>
            <span className="font-[homeworld-bold] -mt-6 text-amber-500 text-[0.8rem] select-none">
              {props.travel.name.toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showOther &&
          <motion.div
            className="absolute top-auto md:left-[4.5rem] z-30 flex flex-col items-center md:justify-start justify-center font-[homeworld-norm] w-2/3 md:w-1/3 select-none"
            style={{ display: showOther ? "flex" : "none" }}
            initial={{ height: "0px", opacity:0 }}
            animate={{ height: showOther ? `${userListLenght}px` : 0, opacity:1 }}
            exit={{height:"0px", opacity:0}}
          >
            {usersList}
          </motion.div>
        }
      </AnimatePresence>
    </>
  );
}
