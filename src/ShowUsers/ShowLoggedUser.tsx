import { useEffect, useState } from "react";
import { iUser } from "../Main";
import ItemsListComponent from "./ItemsListComponent";
import Stats from "./Stats";

export default function ShowLoggedUser(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  return (
    <>
      <div className="flex justify-between">
        <Stats user={props.user} />
        <div className="flex relative flex-col p-4 items-center">
          <img
            className="rounded-full border border-white w-14 h-14 "
            src={props.user?.photoURL}
          />
          <div className="font-[homeworld-norm] text-xs" >
            {props.user?.displayName.toUpperCase()}
          </div>
        </div>
      </div>
      <ItemsListComponent user={props.user} setUser={props.setUser} />
    </>
  );
}
