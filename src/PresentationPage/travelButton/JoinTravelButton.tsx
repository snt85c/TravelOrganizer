import { useNavigate } from "react-router-dom";
import { ImEnter } from "react-icons/im";
import { iTriggers } from "../../Interface";

export default function JoinTravelButton(props: {
  loggedUser: any;
  handleClickSetTravel: Function;
  uiTriggers:iTriggers
  isAlreadyJoined:boolean
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
        {(
          <>
             <div>
              {" "}
              <ImEnter size={20} />
            </div>
            <div className="-mt-1">Join</div>
          </>
        )}
      </div>
    </>
  );
}
