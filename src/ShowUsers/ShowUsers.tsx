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

  const handleBackToProfile = () => {
    setShowSelectedOther(false);
    setShowOther(false);
    setOtherUser(undefined);
  };

  const otherUsersList = props.users?.map((user, i) => {
    return (
      <div
        className="flex w-full md:w-1/3 m-2 justify-center bg-slate-400 hover:bg-amber-500 hover:text-black duration-300 items-center cursor-pointer"
        key={i}
        onClick={() => handleClickSelection(user)}
      >
        {user.displayName.toUpperCase()}
        <img src={user.photoURL} className="w-10 h-10 rounded-full" />
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-row justify-between mx-2">
        <button
          className="flex mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          onClick={handleShowOther}
        >
          mostra altri utenti{!showOther ? <FaChevronDown /> : <FaChevronUp />}
        </button>
        <button 
          className="flex mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          style={{ display: otherUser ? "flex" : "none" }}
          onClick={handleBackToProfile}
        >
          torna al tuo profilo
        </button>
      </div>
      {showOther && (
        <div className="flex items-center md:justify-start justify-center font-[homeworld-norm] mx-2">
          {otherUsersList}
        </div>
      )}
      {otherUser && (
        <>
          <ShowOtherUser user={otherUser} />
        </>
      )}
      {props.loggedUser && !showSelectedOther && (
        <ShowLoggedUser user={props.user} setUser={props.setUser} />
      )}
    </>
  );
}
