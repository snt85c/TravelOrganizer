import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { iTravel } from "./Interface";
import { db } from "./LoginComponents/firebase";

export default function TravelButtonItem(props: {
  i?: number;
  data?: iTravel;
  // setTravel: React.Dispatch<React.SetStateAction<String | undefined>>;
  travelList: [iTravel?];
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  const handleDelete = async () => {
    let tempData: any = props.travelList?.filter((item) => {
      return item?.id !== props.data?.id;
    });
    console.log(props.travelList === tempData,  "equality delete")
    props.setTravelList(tempData);
    try {
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: props.travelList,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRename = () => {};

  return (
    <div
      // onClick={() => props.setTravel(props.data?.name)}
      className="flex flex-col relative w-[1/4] m-1 mx-40 justify-center items-center text-black rounded bg-white border "
    >
      <div className="absolute -top-1 left-0">{props.i}</div>
      <div>{props.data?.name}</div>
      <div className="text-[0.5rem] -mt-2">id:{props.data?.id}</div>
      <div className="flex">
        <div className="mx-2" onClick={handleDelete}>
          delete
        </div>
        <div className="mx-2" onClick={handleRename}>
          rename
        </div>
      </div>
    </div>
  );
}
