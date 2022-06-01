import { iUser } from "../Main";
import ItemsListComponent from "./ItemsListComponent";
import OtherItemsListComponent from "./OtherUsersComponent/OtherItemsListComponent";

export default function ShowUsersList(props:{user: iUser;}){

    return(<>
    <OtherItemsListComponent user={props.user} />
    </>)
}
