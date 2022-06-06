import { useState, useEffect, useContext } from "react";
import { LangContext } from "../LangContextProvider";
import { iGear } from "../Main";

export default function ItemListHeader(props: {
  currentArray: iGear[];
  type: string;
}) {
  const [numberAvailable, setNumberAvailable] = useState<number | string>();
  const [numberReady, setNumberReady] = useState<number | string>();
  const lang = useContext(LangContext)


  let headername: string = "";

  switch (props.type) {
    case "headgear":
      headername = lang.header.headerHead;
      break;
    case "topgear":
      headername = lang.header.headerTorso;
      break;
    case "bottomgear":
      headername = lang.header.headerLegs;
      break;
    case "footgear":
      headername = lang.header.headerFeet;
      break;
    case "extra":
      headername = lang.header.headerExtra;
      break;
  }

  let tempAvNumber = 0;
  let tempReNumber = 0;

  useEffect(() => {
    props.currentArray?.forEach((item: iGear) => {
      if (item.available) {
        tempAvNumber++;
      }
    });
    props.currentArray?.forEach((item: iGear) => {
      if (item.ready) {
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
      <div className="flex  flex-col justify-center p-2 pb-0 gap-2 bg-gradient-to-r from-slate-900 to-slade-700">
        <div className="flex font-[homeworld-bold] text-lg -my-2 text-amber-500">
          {headername}
        </div>
        <div>
          <div className="text-xs">{numberAvailable}</div>
          <div className="text-xs">{numberReady}</div>
        </div>
      </div>
    </>
  );
}
