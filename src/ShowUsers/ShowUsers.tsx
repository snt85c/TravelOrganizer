import { useState } from "react";
import { iUser } from "../Main";
import ShowOtherUser from "./OtherUsersComponent/ShowOtherUser";
import ShowLoggedUser from "./ShowLoggedUser";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ShowUsers(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  users: iUser[] | undefined;
  loggedUser: any;
}) {
  const [showOther, setShowOther] = useState<boolean>(false);
  const [showSelectedOther, setShowSelectedOther] = useState<boolean>(false);
  const [otherUser, setOtherUser] = useState<iUser>();

  const handleShowOther = () => {
    setShowOther(!showOther);
  };

  const handleClickSelection = (user: iUser) => {
    setOtherUser(user);
    setShowOther(false);
    setShowSelectedOther(true);
  };

  const handleClickSelectionUser = (user: iUser) => {
    props.setUser(user);
    setOtherUser(undefined);
    setShowOther(false);
    setShowSelectedOther(false);
  };

  const handleBackToProfile = () => {
    setShowSelectedOther(false);
    setShowOther(false);
    setOtherUser(undefined);
  };

  let usersList = props.users?.map((user, i) => {
    return (
      <div
        className="flex px-4 gap-2 w-[90%] m-1 justify-between bg-slate-400 hover:bg-amber-500 hover:text-black duration-300 items-center cursor-pointer"
        key={i}
        onClick={() => handleClickSelection(user)}
      >
        {user.displayName.toUpperCase()}
        <img src={user.photoURL} className="w-10 h-10 rounded-full" />
      </div>
    );
  });
  //after creating a list of users, if someone has logged in, take that user and push it in the list with a different click handler
  if (props.loggedUser) {
    usersList?.push(
      <div
        key={props.user.uid}
        className="flex px-4 gap-2 w-[90%] m-1 justify-between bg-slate-400 hover:bg-amber-500 hover:text-black duration-300 items-center cursor-pointer"
        onClick={() => handleClickSelectionUser(props.user)}
      >
        {props.user.displayName.toUpperCase()}
        <img src={props.user.photoURL} className="w-10 h-10 rounded-full" />
      </div>
    );
  }

  return (
    <>
      <div className=" flex flex-row justify-between mx-2">
        <button
          className="flex z-20 rounded shadow-lg mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          onClick={handleShowOther}
        >
          mostra utenti{!showOther ? <FaChevronDown /> : <FaChevronUp />}
        </button>
        <button
          className="flex mt-2 rounded shadow-xl px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          style={{ display: otherUser ? "flex" : "none" }}
          onClick={handleBackToProfile}
        >
          indietro
        </button>
      </div>
      {/* if i click a button, show all the users */}
      {showOther && (
        <div className="absolute top-auto z-20 rounded shadow-lg flex flex-col flex-wrap items-center md:justify-start justify-center font-[homeworld-norm]">
          {usersList}
        </div>
      )}
      {/* if i click on an offline user, otherUser is set to true and it will show it */}
      {otherUser && (
        <>
          <ShowOtherUser user={otherUser} />
        </>
      )}
      {/* if im logged in and we are not showing anyone else, show logged in user */}
      {props.loggedUser && !showSelectedOther && (
        <ShowLoggedUser user={props.user} setUser={props.setUser} />
      )}
    </>
  );
}
