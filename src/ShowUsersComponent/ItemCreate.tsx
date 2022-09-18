import { useEffect, useState } from "react";
import { iGear, iReducerAction, iTravelData, iUser } from "../Interface";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";

export default function ItemCreate(props: {
  user: iTravelData;
  travelId: number;
  // setUser?: React.Dispatch<React.SetStateAction<iUser>> | undefined;
  dispatch?: React.Dispatch<iReducerAction>;
  isAddClicked: boolean;
  setIsAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}) {
  const [tempItem, setTempItem] = useState<iGear>({
    name: "",
    ready: false,
    highlighted: false,
    status: "unavailable",
  });

  const { ref } = HandleClickOutsideComponent(props.setIsAddClicked);

  const createButton = (array: string) => {
    let temp: iUser = { ...props.user[props.travelId] };

    switch (array) {
      case "headgear":
        temp.headgear.push(tempItem);
        break;
      case "topgear":
        temp.topgear.push(tempItem);
        break;
      case "bottomgear":
        temp.bottomgear.push(tempItem);
        break;
      case "footgear":
        temp.footgear.push(tempItem);
        break;
      case "extra":
        temp.extra.push(tempItem);
        break;
    }
    const temp2: any = { ...props.user, [props.travelId]: temp };
    // props.setUser && props.setUser(temp2);
    props.dispatch && props.dispatch({type:"MODIFY-USER",payload:temp2})
    props.setIsAddClicked(!props.isAddClicked);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let temp: iGear = { ...tempItem };
    temp.name = e.target.value;
    setTempItem(temp);
  };

  function ToggleButton() {
    let temp: iGear = { ...tempItem };
    const buttonToggle = () => {
      if (temp.status === "unavailable") {
        temp.status = "available";
      } else if (temp.status === "available") {
        temp.status = "ready";
      } else if (temp.status === "ready") {
        temp.status = "unavailable";
      }
      setTempItem(temp);
    };

    return (
      <>
        <div
          onClick={buttonToggle}
          className="flex flex-col cursor-pointer select-none w-12"
        >
          {temp.status === "unavailable" && (
            <div className="flex justify-center items-center text-red-600">
              {" "}
              <FaExclamationCircle className="w-7 h-7" />
            </div>
          )}
          {temp.status === "available" && (
            <div className="flex justify-center items-center  text-amber-700">
              {" "}
              <FaExclamationCircle className="w-7 h-7" />
            </div>
          )}
          {temp.status === "ready" && (
            <div className="flex justify-center items-center  text-green-600">
              {" "}
              <FaCheckCircle className="w-7 h-7 " />
            </div>
          )}
          <div className="text-[0.7rem] select-none flex justify-center items-center">
            {temp.status}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={ref} className="flex flex-row space-between py-1">
        <div className="flex flex-row gap-1 items-center">
          <input
            className="text-black w-[150px] rounded-md px-2"
            placeholder="name"
            value={tempItem.name}
            onChange={(e) => {
              changeName(e);
            }}
          ></input>
          <div className="mx-2">
            <ToggleButton />
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <div className="flex flex-col">
            <button onClick={() => props.setIsAddClicked(!props.isAddClicked)}>
              <FaTimesCircle className="w-7 h-7" />
            </button>
            <div className="flex justify-center items-center select-none text-[0.7rem]">
              cancel
            </div>
          </div>
          <div className="flex flex-col">
            <button onClick={() => createButton(props.type)}>
              <FaPlusCircle className="w-7 h-7 text-green-500" />
            </button>
            <div className="flex justify-center items-center select-none text-[0.7rem]">
              add
            </div>
          </div>
        </div>
      </div>
    </>
  );
}