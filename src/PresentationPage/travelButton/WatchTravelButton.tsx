import {  ImEye } from "react-icons/im";
import { iTriggers } from "../../Main";

export default function WatchTravelButton(props: {
  handleClickSetTravel: Function;
  uiTriggers:iTriggers
}) {
  return (
    <>
      <div
        //left watch travel button
        onClick={() => {
          props.handleClickSetTravel();
          props.uiTriggers.setIssShowUserButton(true)
        }}
        className="m-2 flex flex-col items-center justify-center select-none cursor-pointer"
      >
        {
          <>
            <div>
              {" "}
              <ImEye size={20} />
            </div>
            <div className="-mt-2">View</div>{" "}
          </>
        }
      </div>
    </>
  );
}
