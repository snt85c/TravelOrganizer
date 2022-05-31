import { useState, useEffect } from "react";
import { iGear} from "../Main";

export default function ItemListHeader(props: { currentArray: iGear[]; type: string }) {
  const [numberAvailable, setNumberAvailable] = useState<number | string>();
  const [numberReady, setNumberReady] = useState<number | string>();

  let headername: string = "";

  switch (props.type) {
    case "headgear":
      headername = "HEADGEAR";
      break;
    case "topgear":
      headername = "TOPGEAR"
      break;
    case "bottomgear":
      headername = "BOTTOMGEAR"
      break;
      case "footgear":
        headername = "FOOTGEAR"
        break;
  }

  let tempAvNumber = 0;
  let tempReNumber = 0;

  useEffect(() => {

    props.currentArray.forEach((item: iGear) => {
      if (item.available) {
        tempAvNumber++;
      }
    });
    props.currentArray.forEach((item: iGear) => {
      if (item.ready) {
        tempReNumber++;
      }
    });
    setNumberAvailable(
      tempAvNumber === props.currentArray.length
        ? "all items are available"
        : tempAvNumber + " items available"
    );
    setNumberReady(
      tempReNumber === props.currentArray.length
        ? "all items are ready"
        : tempReNumber + " items ready"
    );
    if (tempReNumber === props.currentArray.length && props.currentArray.length > 0) {
      setNumberAvailable("");
    }
    if (props.currentArray.length === 0) {
      setNumberAvailable("");
      setNumberReady("no items");
    }
  });

  return (
    <>
      <div className="flex gap-2">
        {headername}
        <div>{numberAvailable}</div>
        <div>{numberReady}</div>
      </div>
    </>
  );
}
