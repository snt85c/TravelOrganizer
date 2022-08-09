import { useState, useEffect, useContext } from "react";
import { LangContext } from "../LangContextProvider";
import { iGear } from "../Interface";
import { FaHatCowboySide, FaTshirt } from "react-icons/fa";

import { GiTrousers, GiRunningShoe, GiRoundStar } from "react-icons/gi";
export default function ItemListHeader(props: {
  currentArray: iGear[];
  type: string;
}) {
  const [numberAvailable, setNumberAvailable] = useState<number | string>();
  const [numberReady, setNumberReady] = useState<number | string>();
  const lang = useContext(LangContext);

  let headername: string = "";
  let icon: any;

  switch (props.type) {
    case "headgear":
      headername = lang.header.headerHead;
      icon = <FaHatCowboySide className="w-12 h-12" />;
      break;
    case "topgear":
      headername = lang.header.headerTorso;
      icon = <FaTshirt className="w-12 h-12"/>;
      break;
    case "bottomgear":
      headername = lang.header.headerLegs;
      icon = <GiTrousers className="w-12 h-12"/>;
      break;
    case "footgear":
      headername = lang.header.headerFeet;
      icon = <GiRunningShoe className="w-12 h-12"/>;
      break;
    case "extra":
      headername = lang.header.headerExtra;
      icon = <GiRoundStar className="w-12 h-12"/>;
      break;
  }

  let tempAvNumber = 0;
  let tempReNumber = 0;

  useEffect(() => {
    props.currentArray?.forEach((item: iGear) => {
      if (item.status === "available") {
        tempAvNumber++;
      }
    });
    props.currentArray?.forEach((item: iGear) => {
      if (item.status === "ready") {
        tempReNumber++;
      }
    });
    setNumberAvailable(
      tempAvNumber === props.currentArray?.length
        ? lang.header.setNumAllAvailable
        : tempAvNumber + lang.header.setNumAvailable
    );
    setNumberReady(
      tempReNumber === props.currentArray?.length
        ? lang.header.setNumAllReady
        : tempReNumber + lang.header.setNumReady
    );
    if (
      tempReNumber === props.currentArray?.length &&
      props.currentArray?.length > 0
    ) {
      setNumberAvailable("");
    }
    if (props.currentArray?.length === 0) {
      setNumberAvailable("");
      setNumberReady(lang.header.emptyBag);
    }
  });

  return (
    <>
      <div className="flex  flex-row justify-between p-2 gap-2 bg-gradient-to-r from-slate-900 to-slade-700">
        <div className="flex flex-col ">
          <div className="font-[homeworld-bold] text-lg text-amber-500 select-none">{headername}</div>
          <div className="text-xs text-white select-none">{numberAvailable}</div> 
          <div className="text-xs text-white select-none">{numberReady}</div>
        </div>
        <div>{icon}</div>
      </div>
    </>
  );
}
