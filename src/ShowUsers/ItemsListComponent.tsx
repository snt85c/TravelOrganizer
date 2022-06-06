import { iUser } from "../Main";
import ItemListArrayComponent from "./ItemListArrayComponent";

export default function ItemsListComponent(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  
  return (
    <>
    <ItemListArrayComponent user={props.user} setUser={props.setUser} type={"headgear"} />
    <ItemListArrayComponent user={props.user} setUser={props.setUser} type={"topgear"} />
    <ItemListArrayComponent user={props.user} setUser={props.setUser} type={"bottomgear"} />
    <ItemListArrayComponent user={props.user} setUser={props.setUser} type={"footgear"} />
    <ItemListArrayComponent user={props.user} setUser={props.setUser} type={"extra"} />
    </>
  );
}
