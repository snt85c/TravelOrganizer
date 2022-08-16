import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../LangContextProvider";
import { iTravel, iTravelData, iTriggers } from "../Interface";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
import { AnimatePresence, motion } from "framer-motion";

export default function UserButton(props: {
  uiTriggers: iTriggers;
  travel: iTravel;
  user?: iTravelData;
  users?: iTravelData[];
  loggedUser: any;
  setUser: React.Dispatch<any>;
  setOtherUser: React.Dispatch<React.SetStateAction<iTravelData>>;
}) {
  const navigate = useNavigate();
  const lang = useContext(LangContext);
  const { ref } = HandleClickOutsideComponent(
    props.uiTriggers.setIsShowUserButton
  );

  const handleClickSelection = (user: iTravelData) => {
    if (props.loggedUser) {
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
  };

  let usersList = props.users?.map((user, i) => {
    return (
      <div
        className="flex rounded-md bg-gradient-to-r from-amber-700 to-amber-500 px-4 p-[0.10rem] gap-2 w-[90%] mt-1 justify-between font-[homeworld-norm] hover:text-black duration-300 items-center cursor-pointer select-none"
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

  let userListLenght: number = usersList ? usersList?.length * 50 : 0;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        ref={ref}
        className="flex flex-row min-h-[2.3rem] justify-between mx-2 md:mx-20 select-none"
      >
        {props.travel.id !== 0 && (
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex z-30 rounded-md shadow-lg mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
            onClick={() => {
              props.uiTriggers.setIsShowUserButton(
                !props.uiTriggers.isShowUserButton
              );
            }}
          >
            {"Travellers"}
          </motion.button>
        )}
        {props.travel.id !== 0 && (
          <div className="flex flex-col justify-center items-center  font-[phonk] text-[1.1rem] text-gray-800 z-20 ">
            <span className="font-[homeworld-norm] select-none">
              // {props.travel.id}XX
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-[homeworld-bold] -mt-6 text-amber-500 text-[0.8rem] select-none"
            >
              {props.travel.name.toUpperCase()}
            </motion.span>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {props.uiTriggers.isShowUserButton && (
          <motion.div
            className="absolute top-auto md:left-[4.5rem] z-30 flex flex-col items-center md:justify-start justify-center font-[homeworld-norm] w-2/3 md:w-1/3 select-none"
            style={{
              display: props.uiTriggers.isShowUserButton ? "flex" : "none",
            }}
            initial={{ height: "0px", opacity: 0 }}
            animate={{
              height: props.uiTriggers.isShowUserButton
                ? `${userListLenght}px`
                : 0,
              opacity: 1,
            }}
            exit={{ height: "0px", opacity: 0 }}
          >
            {userListLenght > 0 && usersList}
            {userListLenght === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: +20 }}
                className="flex flex-col rounded-md bg-gradient-to-r from-amber-700 to-amber-500 px-4 p-[0.10rem] gap-2 w-[90%] m-1 justify-center font-[homeworld-norm] text-white duration-300 items-start cursor-pointer select-none leading-none"
              >
                {" "}
                <div className="my-2">NO USERS </div>
                {/* <div
                  style={{ fontFamily: "helvetica" }}
                  className="text-[0.8rem] -mt-4"
                >
                  click on Join
                </div> */}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
