import { iUser } from "../../Main";
import Stats from "../Stats";
import OtherItemListArrayComponent from "./OtherListArrayComponent";

export default function ShowOtherUser(props: {
  user: iUser;
}) {
  

  return (
    <>
    <div className="mx-2 md:mx-20">
      <div className="flex justify-center items-center font-[homeworld-norm]">{props.user.displayName.toUpperCase()}</div>
      <Stats user={props.user} />
      <div className="text-gray-300 text-[0.70rem]"><span className="text-amber-500">readonly:</span> non è possibilie modificare le informazioni di altri utenti</div>
    <OtherItemListArrayComponent user={props.user} type={"headgear"} />
    <OtherItemListArrayComponent user={props.user} type={"topgear"} />
    <OtherItemListArrayComponent user={props.user} type={"bottomgear"} />
    <OtherItemListArrayComponent user={props.user} type={"footgear"} />
    <OtherItemListArrayComponent user={props.user} type={"extra"} />
    </div>
    </>
  );
}
