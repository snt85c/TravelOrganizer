import { iUser } from "../../Main";
import OtherItemListArrayComponent from "./OtherListArrayComponent";

export default function OtherItemsListComponent(props: {
  user: iUser;
}) {
  

  return (
    <>
    <div className="p-2">
    <OtherItemListArrayComponent user={props.user} type={"headgear"} />
    <OtherItemListArrayComponent user={props.user} type={"topgear"} />
    <OtherItemListArrayComponent user={props.user} type={"bottomgear"} />
    <OtherItemListArrayComponent user={props.user} type={"footgear"} />
    <OtherItemListArrayComponent user={props.user} type={"extra"} />
    </div>
    </>
  );
}
