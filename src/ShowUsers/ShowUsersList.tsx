import { iUser } from "../Main";
import OtherItemsListComponent from "./OtherUsersComponent/ShowOtherUser";

export default function ShowUsersList(props:{user: iUser;}){

    return(<>
    <OtherItemsListComponent user={props.user} />
    </>)
}
