import { iTravelData, iUser } from "../Interface";
import UserElementsList from "./UserElementsList(02)";
import Stats from "./Stats";

export default function ShowUser(props: {
  user: iTravelData;
  travelId: number;
  setUser?: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  console.log(props.user && props.user, "current user visualized in showUser");
  console.log(props.user &&
    props.user[props.travelId]?.userInfo?.displayName.toUpperCase(),
    "current userNAME visualized in showUser"
  );

  return (
    <>
      {props.user && (
        <div className="flex flex-col justify-between mx-2 md:mx-20">
          <div className="flex flex-row border mt-2 border-gray-500">
            <div className="flex w-1/2">
              <Stats user={props.user[props.travelId]} />
            </div>
            <div className="flex flex-col p-4 pt-6 items-center w-1/2">
              <img
                className="rounded-full  w-14 h-14 "
                src={props.user[props.travelId]?.userInfo?.photoURL}
              />
              <div className="font-[homeworld-norm] text-xs select-none">
                {props.user[
                  props.travelId
                ]?.userInfo?.displayName.toUpperCase()}
              </div>
            </div>
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
