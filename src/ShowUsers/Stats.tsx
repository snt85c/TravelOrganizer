import { useState, useEffect } from "react";
import { iUser } from "../Main";

interface iStats {
  total: number;
  AvTrue: number;
  AvFalse: number;
  ReTrue: number;
  ReFalse: number;
  notAvailableList: Array<string>;
  notReadyList: Array<string>;
}

export default function Stats(props: { user: iUser }) {
  const [stats, setStats] = useState<iStats>({
    total: 0,
    AvTrue: 0,
    AvFalse: 0,
    ReTrue: 0,
    ReFalse: 0,
    notAvailableList: [],
    notReadyList: [],
  });

  useEffect(() => {
    let tempavtrue: number = 0;
    let tempavfalse: number = 0;
    let temprefalse: number = 0;
    let tempretrue: number = 0;
    let tempNotAv: Array<string> = [];
    let tempNotRe: Array<string> = [];

    props.user.headgear.forEach((item) => {
      if (item.available) {
        tempavtrue++;
      } else {
        tempavfalse++;
        tempNotAv.push(item.name);
      }
      if (item.ready) {
        tempretrue++;
      } else {
        temprefalse++;
        tempNotRe.push(item.name);
      }
    });

    props.user.topgear.forEach((item) => {
      if (item.available) {
        tempavtrue++;
      } else {
        tempavfalse++;
        tempNotAv.push(item.name);
      }
      if (item.ready) {
        tempretrue++;
      } else {
        temprefalse++;
        tempNotRe.push(item.name);
      }
      item.available ? tempavtrue++ : tempavfalse++;
      item.ready ? tempretrue++ : temprefalse++;
    });
    props.user.bottomgear.forEach((item) => {
      if (item.available) {
        tempavtrue++;
      } else {
        tempavfalse++;
        tempNotAv.push(item.name);
      }
      if (item.ready) {
        tempretrue++;
      } else {
        temprefalse++;
        tempNotRe.push(item.name);
      }
    });
    props.user.footgear.forEach((item) => {
      if (item.available) {
        tempavtrue++;
      } else {
        tempavfalse++;
        tempNotAv.push(item.name);
      }
      if (item.ready) {
        tempretrue++;
      } else {
        temprefalse++;
        tempNotRe.push(item.name);
      }
    });
    props.user.extra.forEach((item) => {
      if (item.available) {
        tempavtrue++;
      } else {
        tempavfalse++;
        tempNotAv.push(item.name);
      }
      if (item.ready) {
        tempretrue++;
      } else {
        temprefalse++;
        tempNotRe.push(item.name);
      }
    });
    setStats({
      ...stats,
      AvTrue: tempavtrue,
      AvFalse: tempavfalse,
      ReTrue: tempretrue,
      ReFalse: temprefalse,
      notAvailableList: tempNotAv,
      notReadyList: tempNotRe,
    });
  }, [props.user]);

  let notAvList = stats.notAvailableList.map((item, i) => {
    return <div className="text-amber-500 "key={i}>{item}</div>;
  });

  let notReList = stats.notReadyList.map((item, i) => {
    return <div key={i}>{item}</div>;
  });

  return (
    <>
      <div className="flex flex-col p-2 mx-2 my-1 border border-gray-500">
        <div className="font-extrabold font-[homeworld-norm] text-sm">
          RIEPILOGO
        </div>
        <div className="font-xs">
          {stats.AvTrue !== stats.ReTrue && (
            <div>disponibile: {stats.AvTrue}</div>
          )}
          {stats.AvTrue !== stats.ReTrue ? (
            <div> nello zaino: {stats.ReTrue}</div>
          ) : (
            <div> tutti gli elementi disponibili sono nello zaino</div>
          )}
          {stats.AvFalse !== 0 && (
            <div>
              {" "}
              da prendere:{" "}
              <span className="text-amber-500">{stats.AvFalse}</span>
            </div>
            
          )}
           {notAvList.length !== 0 && (
            <>
              <div>{notAvList}</div>
            </>
          )}
          {stats.ReFalse !== 0 && (
            <div> da mettere nello zaino: {stats.ReFalse}</div>
          )}
         
        </div>
      </div>
    </>
  );
}