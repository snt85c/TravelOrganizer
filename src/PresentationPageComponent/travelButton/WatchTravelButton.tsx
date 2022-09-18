import {  ImEye } from "react-icons/im";
import { iTravelButtonPropsPackage } from "../../Interface";

export default function WatchTravelButton(props: {
  handleClickSetTravel: Function;
  uiTriggers:iTravelButtonPropsPackage
}) {
  return (
    <>
      <div
        //left watch travel button
        onClick={() => {
          props.uiTriggers.setIsShowUserButton(true)
          props.uiTriggers.setTrigger(Date.now())
          props.uiTriggers.setIsJoining(false)
          props.uiTriggers.setIsWatching(true)
          props.handleClickSetTravel();
        }}
        className="m-2 flex flex-col items-center justify-center select-none cursor-pointer"
      >
        {
          <>
            <div>
              {" "}
              <ImEye size={20} />
            </div>
            <div className="-mt-1">View</div>{" "}
          </>
        }
      </div>
    </>
  );
}
