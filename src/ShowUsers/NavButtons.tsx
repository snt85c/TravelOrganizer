import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iUser } from "../Main";

export default function NavButton(props: {
  user: iUser;
  users: iUser[];
  loggedUser: any;
  setOtherUser: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  const [showOther, setShowOther] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleShowOther = () => {
    setShowOther(!showOther);
  };

  const handleClickSelection = (user: iUser) => {
    if (user.uid !== props.loggedUser?.uid) {
      props.setOtherUser(user);
      navigate("/other");
    } else {
      navigate("/user");
    }
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

  return (
    <>
      <div className=" flex flex-row justify-between mx-2">
        <button
          className="flex z-20 rounded shadow-lg mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          onClick={handleShowOther}
        >
          mostra utenti
        </button>
      </div>
      {showOther && (
        <div className="absolute top-auto z-20 rounded shadow-lg flex flex-col flex-wrap items-center md:justify-start justify-center font-[homeworld-norm]">
          {usersList}
        </div>
      )}
    </>
  );
}
