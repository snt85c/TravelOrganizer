import { useContext } from "react";
import { LangContext } from "../AppComponent/LangContextProvider";
import { iReducerAction, iTravelData, iUser } from "../Interface";
import UserItemsList from "./UserItemsList(03)";

export default function UserElementsList(props: {
  user: iTravelData;
  travelId: number;
  // setUser?: React.Dispatch<React.SetStateAction<iUser>>;
  dispatch?: React.Dispatch<iReducerAction>;

}) {
  const lang = useContext(LangContext);
  const SWIPE_INSTRUCTION_LX = lang.swipeComponent.swipeInstructionLx;
  const SWIPE_INSTRUCTION_RX = lang.swipeComponent.swipeInstructionRx;
  const MD_HIGHLIGHT_INSTRUCTION = lang.itemListComponent.highlightInstruction;
  return (
    <>
      {!props.dispatch && (
        <div className="text-gray-300 text-[0.70rem]">
          <span className="text-amber-500 select-none">readonly:</span>
          {lang.itemListComponent.readonlyMessage}
        </div>
      )}
      {props.dispatch && (
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
      <div className="flex">
        <div className="w-[90%]">
          <UserItemsList
            user={props.user}
            travelId={props.travelId}
            dispatch={props.dispatch}
            type={"headgear"}
          />
          <UserItemsList
            user={props.user}
            travelId={props.travelId}
            dispatch={props.dispatch}
            type={"topgear"}
          />
          <UserItemsList
            travelId={props.travelId}
            user={props.user}
            dispatch={props.dispatch}
            type={"bottomgear"}
          />
          <UserItemsList
            travelId={props.travelId}
            user={props.user}
            dispatch={props.dispatch}
            type={"footgear"}
          />
          <UserItemsList
            user={props.user}
            travelId={props.travelId}
            dispatch={props.dispatch}
            type={"extra"}
          />
        </div>
        {props.user.userInfo && <div
          style={{ writingMode: "vertical-rl" }}
          className="flex relative z-30  pr-2 font-[phonk] text-[5rem]  bg-gray-800 leading-none select-none "
        >
           <img
            className="rounded-full m-2 w-14 h-14 "
            src={props.user.userInfo.photoURL}
          />
          {props.user.userInfo.displayName.toUpperCase()}
        </div>}
      </div>
    </>
  );
}
