import { ImEnter, ImEye } from "react-icons/im";

export default function WatchTravelButton(props: {
  handleClickSetTravel: Function;
  setIsWatching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        //left watch travel button
        onClick={() => {
          props.handleClickSetTravel();
          props.setIsWatching(true);
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
