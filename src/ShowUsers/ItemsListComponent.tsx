import { DocumentData } from "firebase/firestore";

export default function ItemsListComponent(props: {
  user: DocumentData | undefined;
}) {
  const headgearlist = props.user?.headgear.map(
    (item: DocumentData, i: number) => {
      return (
        <div className="flex gap-2" key={i}>
          <div>{item.name}</div>
          <div>{item.description}</div>
          <div className="min-h-[5px] min-w-[5zpx] rounded-full" style={{backgroundColor:props.user?.available?"green":"red"}}></div>
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
