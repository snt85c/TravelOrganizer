import { useNavigate } from "react-router-dom";
import { ImEnter } from "react-icons/im";

export default function JoinTravelButton(props: {
  loggedUser: any;
  handleClickSetTravel: Function;
  setIsWatching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        //right join travel button
        onClick={() => {
          props.handleClickSetTravel();
          props.setIsWatching(false);
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
