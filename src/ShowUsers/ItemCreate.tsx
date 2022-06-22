import { useEffect, useState } from "react";
import { iGear, iUser } from "../Main";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function ItemCreate(props: {
  user: iUser;
  setUser?: React.Dispatch<React.SetStateAction<iUser>> | undefined;
  isAddClicked: boolean;
  setIsAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}) {
  const [tempItem, setTempItem] = useState<iGear>({
    name: "",
    available: false,
    ready: false,
    highlighted:false,
    status:"unavailable"
  });

  const createButton = (array: string) => {
    let temp: iUser = { ...props.user };

    switch (array) {
      case "headgear":
        temp.headgear?.push(tempItem);
        break;
      case "topgear":
        temp.topgear?.push(tempItem);
        break;
      case "bottomgear":
        temp.bottomgear?.push(tempItem);
        break;
      case "footgear":
        temp.footgear?.push(tempItem);
        break;
      case "extra":
        temp.extra?.push(tempItem);
        break;
    }
    props.setUser && props.setUser(temp);
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
      <div className="flex flex-row p-2 gap-2 justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <input
            className="text-black min-w-[50%] md:w-[1/4] rounded-md px-2"
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
          <button onClick={() => props.setIsAddClicked(!props.isAddClicked)}>
            <FaTimesCircle className="w-7 h-7" />
          </button>
          <button onClick={() => createButton(props.type)}>
            <FaPlusCircle className="w-7 h-7 text-green-500" />
          </button>
        </div>
      </div>
    </>
  );
}
