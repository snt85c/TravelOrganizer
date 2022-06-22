import { iUser } from "../Main";
import UserElementsList from "./UserElementsList";
import Stats from "./Stats";

export default function ShowUser(props: {
  user: iUser;
  setUser?: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  return (
    <>
      <div className="flex flex-col justify-between mx-2 md:mx-20">
        <div className="flex flex-row border mt-2 border-gray-500">
          {/* <div className="flex w-1/2"> */}
            <Stats user={props.user} />
          {/* </div> */}
          <div className="flex flex-col p-4 pt-6 items-center w-1/2">
            <img
              className="rounded-full  w-14 h-14 "
              src={props.user?.photoURL}
            />
            <div className="font-[homeworld-norm] text-xs select-none">
              {props.user?.displayName.toUpperCase()}
            </div>
          </div>
        </div>
        <UserElementsList user={props.user} setUser={props.setUser} />
      </div>
    </>
  );
}
