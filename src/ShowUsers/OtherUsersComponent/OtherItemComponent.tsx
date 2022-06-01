import { useEffect, useRef, useState } from "react";
import { iGear, iUser } from "../../Main";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function OtherItemComponent(props: {
  index: number;
  type: string;
  currentArray: iGear[];
  item: iGear;
  user: iUser;
}) {

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

  return (
    <>
      <div className="flex flex-row justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900">
        <div className="flex flex-row gap-2">
          <div
            className="flex flex-col"
          >
            <div className="text-gray-600 text-[0.7rem] -my-1">nome:</div>
            <div className="text-white ">
              {props.item?.name ? props.item?.name : "empty"}
            </div>
          </div>
         
          {/* <div
            className="flex flex-col "
            onClick={() => setIsEditDescr(!isEditDescr)}
          >
            <div className="text-gray-600 text-[0.7rem] -my-1">
              descrizione:
            </div>
            <div className="text-white">
              {props.item?.description ? props.item?.description : "empty"}
            </div>
          </div> */}
      
        </div>

        <div className="flex flex-row items-center gap-1">
          <div
            className="cursor-pointer"
            style={{ color: props.item?.available ? "green" : "red" }}
          >{props.item.available? <FaCheckCircle className="w-7 h-7" />:<FaExclamationCircle className="w-7 h-7"/>}</div>
          <div
            className="cursor-pointer"
            style={{ color: props.item?.ready ? "green" : "red" }}
          > {props.item.ready? <FaCheckCircle className="w-7 h-7" />:<FaExclamationCircle className="w-7 h-7" />}</div>
        </div>
      </div>
    </>
  );
}
