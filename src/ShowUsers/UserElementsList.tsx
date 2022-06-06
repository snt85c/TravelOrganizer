import { useContext } from "react";
import { LangContext } from "../LangContextProvider";
import { iUser } from "../Main";
import UserItemsList from "./UserItemsList";

export default function UserElementsList(props: {
  user: iUser;
  setUser?: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  const lang = useContext(LangContext)

  return (
    <>
      {!props.setUser && (
        <div className="text-gray-300 text-[0.70rem]">
          <span className="text-amber-500">readonly:</span>{lang.itemListComponent.readonlyMessage}
        </div>
      )}
      <UserItemsList
        user={props.user}
        setUser={props.setUser}
        type={"headgear"}
      />
      <UserItemsList
        user={props.user}
        setUser={props.setUser}
        type={"topgear"}
      />
      <UserItemsList
        user={props.user}
        setUser={props.setUser}
        type={"bottomgear"}
      />
      <UserItemsList
        user={props.user}
        setUser={props.setUser}
        type={"footgear"}
      />
      <UserItemsList
        user={props.user}
        setUser={props.setUser}
        type={"extra"}
      />
    </>
  );
}
