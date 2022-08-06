import { iTravelData, iUser } from "../Interface";
import UserElementsList from "./UserElementsList(02)";
import Stats from "./Stats";
import { useState } from "react";

export default function ShowUser(props: {
  user: iTravelData;
  travelId: number;
  setUser?: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  const [isShowingStats, setIsShowingStats] = useState(false);
  return (
    <>
      {props.user && (
        <div className="flex flex-col justify-between mx-2 md:mx-20">
          <div
            onClick={() => setIsShowingStats(!isShowingStats)}
            className="flex flex-row justify-center items-center text-center rounded-md border my-2 bg-gray-500 duration-300"
            style={{
              height: isShowingStats ? "150px" : "25px",
              backgroundColor: isShowingStats ? "" : "white",
            }}
          >
            {!isShowingStats && (
              <span className="text-black text-[0.6rem] font-[homeworld-norm]">
                STATS
              </span>
            )}
            {isShowingStats && <Stats user={props.user[props.travelId]} />}
            {/* <div className="flex flex-col p-4 pt-6 items-center w-1/2"> */}
            {/* <img
                className="rounded-full  w-14 h-14 "
                src={props.user[props.travelId]?.userInfo?.photoURL}
              /> */}
            {/* <div className="font-[homeworld-norm] text-xs select-none">
                {props.user[
                  props.travelId
                ]?.userInfo?.displayName.toUpperCase()}
              </div> */}
            {/* </div> */}
          </div>
          <UserElementsList
            user={props.user}
            travelId={props.travelId}
            setUser={props.setUser}
          />
        </div>
      )}
    </>
  );
}
