import { useEffect } from "react";
import { iUser } from "../Main";
import ItemsListComponent from "./ItemsListComponent";

export default function ShowLoggedUser(props: {
  user: iUser 
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  return (
    <>
      <div className="flex justify-end">
        <div className="flex relative right-0 flex-col p-4 items-center">
          <img
            className="rounded-full border border-white w-20 h-20"
            src={props.user?.photoURL}
          />
          <div>{props.user?.displayName}</div>
        </div>
      </div>
      <ItemsListComponent user={props.user} setUser={props.setUser}/>
    </>
  );
}
