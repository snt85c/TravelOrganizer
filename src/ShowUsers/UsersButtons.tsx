import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../LangContextProvider";
import {
  iTravelData,
  iTravelButtonPropsPackage,
  iUsersStatePropsPackage,
} from "../Interface";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
import { AnimatePresence, motion } from "framer-motion";

export default function UserButton(props: {
  travelButtonPropsPackage: iTravelButtonPropsPackage;
  usersStatePropsPackage: iUsersStatePropsPackage;
}) {
  const navigate = useNavigate();
  const lang = useContext(LangContext);
  const { ref } = HandleClickOutsideComponent(
    props.travelButtonPropsPackage.setIsShowUserButton
  );

  //having the usersList, it creates  the usersListButtons. this is generated  either by joinTravel or watchTravel on Main.tsx
  let usersListButtons = props.usersStatePropsPackage.usersList?.map(
    (user, i) => {
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
    }
  );

  //used for animated render of the entirety of the usersList.
  let userListLenght: number = usersListButtons
    ? usersListButtons?.length * 50
    : 0;

  //when the single usersListButton is clicked it will run the following checks.
  // if im logged and the loggedUser.uid isn't the same as the user i clicked from the usersListButton (or, i clicked on anyone other than me on the list), the setOtherUser and send to /other route, otherwise it will assume user.uid and loggedUser.uid are the same, setUser as user then send to /user route. otherwise im not logged-in and it will set whatever i click as otherUser and send me to /other route
  const handleClickSelection = (user: iTravelData) => {
    if (props.usersStatePropsPackage.loggedUser) {
      if (user.userInfo.uid !== props.usersStatePropsPackage.loggedUser?.uid) {
        props.usersStatePropsPackage.setOtherUser(user);
        navigate("/other");
      } else {
        props.usersStatePropsPackage.setUser(user);
        navigate("/user");
      }
    } else {
      props.usersStatePropsPackage.setOtherUser(user);
      navigate("/other");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        ref={ref}
        className="flex flex-row min-h-[2.3rem] justify-between mx-2 md:mx-20 select-none"
      >
        {props.usersStatePropsPackage.travel.id !== 0 && (
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex z-30 rounded-md shadow-lg mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
            onClick={() => {
              props.travelButtonPropsPackage.setIsShowUserButton(
                !props.travelButtonPropsPackage.isShowUserButton
              );
            }}
          >
            {lang.usersButton.travellers}
          </motion.button>
        )}
        {props.usersStatePropsPackage.travel.id !== 0 && (
          <div className="flex flex-col justify-center items-center  font-[phonk] text-[1.1rem] text-gray-800 z-20 ">
            <span className="font-[homeworld-norm] select-none">
              // {props.usersStatePropsPackage.travel.id}XX
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-[homeworld-bold] -mt-6 text-amber-500 text-[0.8rem] select-none"
            >
              {props.usersStatePropsPackage.travel.name.toUpperCase()}
            </motion.span>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {props.travelButtonPropsPackage.isShowUserButton && (
          <motion.div
            className="absolute top-auto md:left-[4.5rem] z-30 flex flex-col items-center md:justify-start justify-center font-[homeworld-norm] w-2/3 md:w-1/3 select-none"
            style={{
              display: props.travelButtonPropsPackage.isShowUserButton
                ? "flex"
                : "none",
            }}
            initial={{ height: "0px", opacity: 0 }}
            animate={{
              height: props.travelButtonPropsPackage.isShowUserButton
                ? `${userListLenght}px`
                : 0,
              opacity: 1,
            }}
            exit={{ height: "0px", opacity: 0 }}
          >
            {userListLenght > 0 && usersListButtons}
            {userListLenght === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: +20 }}
                className="flex flex-col rounded-md bg-gradient-to-r from-amber-700 to-amber-500 px-4 p-[0.10rem] gap-2 w-[90%] m-1 justify-center font-[homeworld-norm] text-white duration-300 items-start cursor-pointer select-none leading-none"
              >
                {" "}
                <div className="my-2">{lang.usersButton.nousers}</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
