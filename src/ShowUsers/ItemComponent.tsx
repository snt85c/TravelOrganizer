import {  useState } from "react";
import { iGear, iUser } from "../Main";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function ItemComponent(props: {
  index: number;
  type: string;
  currentArray: iGear[];
  item: iGear;
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [change, setChange] = useState<string>("");

  let currentArray: iGear[];
  let temp: iUser | undefined = props.user;

  switch (props.type) {
    case "headgear":
      currentArray = temp.headgear;
      break;
    case "topgear":
      currentArray = temp.topgear;
      break;
    case "bottomgear":
      currentArray = temp.bottomgear;
      break;
    case "footgear":
      currentArray = temp.footgear;
      break;
    case "extra":
      currentArray = temp.extra;
      break;
  }

  const changeReady = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].ready = !props.currentArray[props.index].ready;
    if (currentArray[props.index].ready) {
      currentArray[props.index].available = true;
    }
    props.setUser(temp);
  };

  const changeAvailable = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].available =
      !props.currentArray[props.index].available;
    if (!currentArray[props.index].available) {
      currentArray[props.index].ready = false;
    }
    props.setUser(temp);
  };

  const setNameChange = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].name = change;
    props.setUser(temp);
    setIsEditName(!isEditName);
  };

  const handleDelete = () => {
    let temp: iUser = { ...props.user };
    currentArray.splice(props.index, 1);
    props.setUser(temp);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900">
        <div className="flex flex-row gap-2">
          <div
            className="flex flex-col"
            onClick={() => setIsEditName(!isEditName)}
          >
            <div className="text-gray-600 text-[0.7rem] -my-1">nome:</div>
            <div className="text-white ">
              {props.item?.name ? props.item?.name : "empty"}
            </div>
          </div>
          {isEditName && (
            <>
              <div className="absolute top-auto left-auto z-20 flex m-4 p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700">
                <input
                  className="text-white rounded-xl px-2 bg-gray-600"
                  defaultValue={props.item.name}
                  onChange={(e) => setChange(e.target.value)}
                ></input>
                <div className="flex px-2 gap-2">
                  <button onClick={() => setIsEditName(!isEditName)}>
                    <FaTimesCircle />
                  </button>
                  <button onClick={setNameChange}>
                    <FaPlusCircle className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div
            className="cursor-pointer"
            style={{ color: props.item?.available ? "green" : "red" }}
            onClick={changeAvailable}
          >
            {props.item.available ? (
              <FaCheckCircle className="w-7 h-7" />
            ) : (
              <FaExclamationCircle className="w-7 h-7" />
            )}
          </div>
          <div
            className="cursor-pointer"
            style={{ color: props.item?.ready ? "green" : "red" }}
            onClick={changeReady}
          >
            {" "}
            {props.item.ready ? (
              <FaCheckCircle className="w-7 h-7" />
            ) : (
              <FaExclamationCircle className="w-7 h-7" />
            )}
          </div>
          <button onClick={handleDelete}>
            <FaTimesCircle className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  );
}
