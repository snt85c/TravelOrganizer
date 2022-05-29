import { DocumentData } from "firebase/firestore";
import ShowLoggedUser from "./ShowLoggedUser";
import ShowUsersList from "./ShowUsersList";

export default function ShowUsers(props:{user:DocumentData | undefined, users:DocumentData | undefined}){
    return(<>
    <ShowLoggedUser user={props.user} />
    <ShowUsersList users={props.users} />
    </>)
}