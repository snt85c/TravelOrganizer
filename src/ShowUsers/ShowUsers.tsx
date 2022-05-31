import { iUser } from "../Main";
import ShowLoggedUser from "./ShowLoggedUser";

export default function ShowUsers(props: {
  user: iUser 
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  users: iUser[] | undefined;
}) {
  return (
    <>
      <ShowLoggedUser user={props.user} setUser={props.setUser} />
      {/* <ShowUsersList users={props.users} /> */}
    </>
  );
}
