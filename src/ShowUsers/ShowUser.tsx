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
        <div className="flex relative flex-col p-4 items-center">
          <img
            className="rounded-full border border-white w-14 h-14 "
            src={props.user?.photoURL}
          />
          <div className="font-[homeworld-norm] text-xs">
            {props.user?.displayName.toUpperCase()}
          </div>
        </div>
        <Stats user={props.user} />
        <UserElementsList user={props.user} setUser={props.setUser} />
      </div>
    </>
  );
}
