import { DocumentData } from "firebase/firestore";
import { iUser } from "../Main";

interface iGear{
  name:string,
  description:string,
  available:boolean,
  ready:boolean
}

export default function ItemsListComponent(props: {
  user: iUser | undefined;
}) {
  const headgearlist = props.user?.headgear?.map(
    (item: iGear | undefined, i: number) => {
      return (
        <div className="flex gap-2" key={i}>
          <div>{item?.name}</div>
          <div>{item?.description}</div>
          <div className="min-h-[5px] min-w-[5zpx] rounded-full" style={{backgroundColor:item?.available?"green":"red"}}></div>
          <div></div>
        </div>
      );
    }
  );

  return (
    <>
    <div>HEADGEAR</div>
      <div>{headgearlist}</div>
    </>
  );
}
