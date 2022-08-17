import { useNavigate } from "react-router-dom";
import { ImEnter } from "react-icons/im";
import { iTravelButtonPropsPackage } from "../../Interface";

export default function JoinTravelButton(props: {
  loggedUser: any;
  handleClickSetTravel: Function;
  travelButtonPropsPackage:iTravelButtonPropsPackage
  isAlreadyJoined:boolean
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        //right join travel button
        onClick={() => {
          props.handleClickSetTravel();
          props.travelButtonPropsPackage.setIsShowUserButton(true)
          props.travelButtonPropsPackage.setIsJoining(true)
          props.travelButtonPropsPackage.setIsWatching(false)
          props.travelButtonPropsPackage.setTrigger(Date.now)
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
