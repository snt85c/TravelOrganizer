import { iUser } from "../Main";
import ShowLoggedUser from "./ShowLoggedUser";
import ShowUsersList from "./ShowUsersList";

export default function ShowUsers(props: {
  user: iUser 
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  users: iUser[] | undefined;
  loggedUser:any
}) {
  return (
    <>
    {props.loggedUser && <ShowLoggedUser user={props.user} setUser={props.setUser} />}
      <ShowUsersList users={props.users} />
    </>
  );
}
