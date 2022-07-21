export default function TravelButtonItem(props: { key: number; data: string, setTravel:React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div onClick={()=>props.setTravel(props.data)} className="flex w-[1/4] m-1 mx-40 justify-center items-center text-black rounded bg-white border ">
      {props.data}
    </div>
  );
}
