import { useState } from "react";
import { iUser } from "../Main";
import OtherItemsListComponent from "./OtherUsersComponent/OtherItemsListComponent";
import ShowLoggedUser from "./ShowLoggedUser";
import ShowUsersList from "./ShowUsersList";

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
        className="flex justify-center items-center"
        key={i}
        onClick={() => handleClickSelection(user)}
      >
        {user.displayName.toUpperCase()}
        <img src={user.photoURL} />
      </div>
    );
  });
  return (
    <>
      <button onClick={handleShowOther}>mostra altri utenti</button>
      {showOther && (
        <div className="flex border items-center justify-center m-2 -p-2 font-[homeworld-norm] ">
          {otherUsersList}
        </div>
      )}
      {otherUser && (
        <>
          <button onClick={handleBackToProfile}>torna al tuo profilo</button>
          <OtherItemsListComponent user={otherUser} />
        </>
      )}
      {props.loggedUser && !showSelectedOther && (
        <ShowLoggedUser user={props.user} setUser={props.setUser} />
      )}
    </>
  );
}
