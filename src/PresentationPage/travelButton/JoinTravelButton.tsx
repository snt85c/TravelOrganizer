import { useNavigate } from "react-router-dom";
import { ImEnter } from "react-icons/im";
import { iTriggers } from "../../Interface";

export default function JoinTravelButton(props: {
  loggedUser: any;
  handleClickSetTravel: Function;
  uiTriggers:iTriggers
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        //right join travel button
        onClick={() => {
          props.handleClickSetTravel();
          props.uiTriggers.setIsShowUserButton(true)
          props.uiTriggers.setIsJoining(true)
          props.uiTriggers.setIsWatching(false)
          props.uiTriggers.setTrigger(Date.now)
          navigate("/user");
        }}
        className="m-2 flex flex-col items-center justify-center select-none cursor-pointer"
      >
        {props.loggedUser && (
          <>
            <div>
              {" "}
              <ImEnter size={20} />
            </div>
            <div className="-mt-2">Join</div>
          </>
        )}
      </div>
    </>
  );
}
