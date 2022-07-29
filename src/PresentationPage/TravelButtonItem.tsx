import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { iTravel } from "../Interface";
import { db } from "../LoginComponents/firebase";

export default function TravelButtonItem(props: {
  i?: number;
  data?: iTravel;
  setTravel: React.Dispatch<React.SetStateAction<iTravel>>;
  travelList: [iTravel?];
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      let filteredTravelList: any = props.travelList?.filter((item) => {
        return item?.id !== props.data?.id;
      });
      props.setTravelList(filteredTravelList);
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: filteredTravelList,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRename = () => {
    console.log("TODO");
  };

  const handleClick = () => {
    props.setTravel(props.data ? props.data : { name: "", id: 0 });
    navigate("/user")
  };

  return (
    <div
      onClick={() => {
        props.setTravel(props.data ? props.data : { name: "", id: 0 });
        navigate("/user")
      }}
      className="flex flex-col relative w-[1/4] m-1 mx-10 md:mx-40 justify-center items-center text-black rounded bg-white border "
    >
      <div className="absolute top-0 left-1 text-[0.7rem]">{props.i}</div>
      <div className="text-xl">{props.data?.name}</div>
      <div className="text-[0.5rem] -mt-2">id:{props.data?.id}</div>
      <div className="flex -mt-1">
        <div
          className="mx-2  text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300"
          onClick={handleDelete}
        >
          delete
        </div>
        <div
          className="mx-2 text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300"
          onClick={handleRename}
        >
          rename
        </div>
      </div>
    </div>
  );
}
