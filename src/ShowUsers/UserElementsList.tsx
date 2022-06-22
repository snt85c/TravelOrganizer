import { useContext } from "react";
import { LangContext } from "../LangContextProvider";
import { iUser } from "../Main";
import UserItemsList from "./UserItemsList";

export default function UserElementsList(props: {
  user: iUser;
  setUser?: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  const lang = useContext(LangContext);
  const SWIPE_INSTRUCTION_LX = lang.swipeComponent.swipeInstructionLx;
  const SWIPE_INSTRUCTION_RX = lang.swipeComponent.swipeInstructionRx;
  const MD_HIGHLIGHT_INSTRUCTION = lang.itemListComponent.highlightInstruction;

  return (
    <>
      {!props.setUser && (
        <div className="text-gray-300 text-[0.70rem]">
          <span className="text-amber-500 select-none">readonly:</span>
          {lang.itemListComponent.readonlyMessage}
        </div>
      )}
      {props.setUser && (
        <>
          {" "}
          <div className="flex justify-between px-2 text-[0.70rem] text-gray-300 md:hidden select-none">
            <span>{SWIPE_INSTRUCTION_LX}</span>
            <span>{SWIPE_INSTRUCTION_RX}</span>
          </div>
          <div className="md:flex justify-center items-center px-2 hidden  text-[0.70rem] text-gray-300 select-none">
            <span>{MD_HIGHLIGHT_INSTRUCTION}</span>
          </div>
        </>
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
      <UserItemsList user={props.user} setUser={props.setUser} type={"extra"} />
    </>
  );
}
