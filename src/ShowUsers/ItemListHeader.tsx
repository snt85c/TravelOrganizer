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
        ? "tutti gli oggetti sono pronti ad essere mezzi nello zaino"
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
      <div className="flex flex-col items-center p-2 gap-2 bg-slate-900">
        <div className="font-[homeworld-norm] font-extrabold text-lg -my-2">
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
