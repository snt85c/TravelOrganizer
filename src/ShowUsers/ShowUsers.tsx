import { DocumentData } from "firebase/firestore";
import { iUser } from "../Main";
import ShowLoggedUser from "./ShowLoggedUser";
import ShowUsersList from "./ShowUsersList";

export default function ShowUsers(props:{user:iUser | undefined, users:iUser[] | undefined}){
    return(<>
    <ShowLoggedUser user={props.user} />
    {/* <ShowUsersList users={props.users} /> */}
    </>)
}