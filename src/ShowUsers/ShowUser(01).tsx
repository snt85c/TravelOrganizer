import { iTravelData, iUser } from "../Interface";
import UserElementsList from "./UserElementsList(02)";
import Stats from "./Stats";
import { useEffect, useState } from "react";
import DeleteUserButton from "./DeleteUserButton";
import { useNavigate } from "react-router-dom";

export default function ShowUser(props: {
  user: iTravelData;
  travelId: number;
  setUser?: React.Dispatch<React.SetStateAction<iUser>>;
  handleDeleteUser?: Function;
}) {
  const [isShowingStats, setIsShowingStats] = useState(false);
  const navigate = useNavigate()

  useEffect(() => { if (!props.user) navigate("/") }, [])

  return (
    <>
      {props.user && (
        <div className="flex flex-col justify-between ml-2 mr-0 md:mx-20">
          <div
            onClick={() => setIsShowingStats(!isShowingStats)}
            className="flex flex-row justify-center items-center text-center rounded-md border my-2 bg-gray-500 duration-300"
            style={{
              height: isShowingStats ? "100px" : "25px",
              backgroundColor: isShowingStats ? "" : "white",
            }}
          >
            {!isShowingStats && (
              <span className="text-black text-[0.6rem] font-[homeworld-norm]">
                STATS
              </span>
            )}
            {isShowingStats && <Stats user={props.user[props.travelId]} />}
          </div>
          <UserElementsList
            user={props.user}
            travelId={props.travelId}
            setUser={props.setUser}
          />
          {props.setUser && <DeleteUserButton handleDeleteUser={props.handleDeleteUser} user={props.user} travelId={props.travelId} setUser={props.setUser} />}
        </div>
      )}
    </>
  );
}
