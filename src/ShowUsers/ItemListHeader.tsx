import { useState, useEffect } from "react";
import { iGear } from "../Main";

export default function ItemListHeader(props: {
  currentArray: iGear[];
  type: string;
}) {
  const [numberAvailable, setNumberAvailable] = useState<number | string>();
  const [numberReady, setNumberReady] = useState<number | string>();

  let headername: string = "";

  switch (props.type) {
    case "headgear":
      headername = "TESTA";
      break;
    case "topgear":
      headername = "TORSO";
      break;
    case "bottomgear":
      headername = "GAMBE";
      break;
    case "footgear":
      headername = "PIEDI";
      break;
    case "extra":
      headername = "EXTRA";
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
        ? "tutti gli oggetti sono pronti ad essere messi nello zaino"
        : tempAvNumber + " oggetti pronti per lo zaino"
    );
    setNumberReady(
      tempReNumber === props.currentArray?.length
        ? "tutti gli oggetti di questa categoria sono nello zaino"
        : tempReNumber + " oggetti nello zaino"
    );
    if (
      tempReNumber === props.currentArray?.length &&
      props.currentArray?.length > 0
    ) {
      setNumberAvailable("");
    }
    if (props.currentArray?.length === 0) {
      setNumberAvailable("");
      setNumberReady("aggiungi degli elementi");
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
