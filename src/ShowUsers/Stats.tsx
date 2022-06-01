import { useState, useEffect } from "react";
import { iUser } from "../Main";

interface iStats {
  total: number;
  AvTrue: number;
  AvFalse: number;
  ReTrue: number;
  ReFalse: number;
}

export default function Stats(props: { user: iUser }) {
  const [stats, setStats] = useState<iStats>({
    total: 0,
    AvTrue: 0,
    AvFalse: 0,
    ReTrue: 0,
    ReFalse: 0,
  });

  useEffect(() => {
    let tempavtrue: number = 0;
    let tempavfalse: number = 0;
    let temprefalse: number = 0;
    let tempretrue: number = 0;

    props.user.headgear.forEach((item) => {
      item.available ? tempavtrue++ : tempavfalse++;
      item.ready ? tempretrue++ : temprefalse++;
    });

    props.user.topgear.forEach((item) => {
      item.available ? tempavtrue++ : tempavfalse++;
      item.ready ? tempretrue++ : temprefalse++;
    });
    props.user.bottomgear.forEach((item) => {
      item.available ? tempavtrue++ : tempavfalse++;
      item.ready ? tempretrue++ : temprefalse++;
    });
    props.user.footgear.forEach((item) => {
      item.available ? tempavtrue++ : tempavfalse++;
      item.ready ? tempretrue++ : temprefalse++;
    });
    props.user.extra.forEach((item) => {
      item.available ? tempavtrue++ : tempavfalse++;
      item.ready ? tempretrue++ : temprefalse++;
    });
    setStats({
      ...stats,
      AvTrue: tempavtrue,
      AvFalse: tempavfalse,
      ReTrue: tempretrue,
      ReFalse: temprefalse,
    });
  }, [props.user]);
  return (
    <>
      <div className="flex flex-col w-1/2 p-2 mx-2 my-1 border border-gray-500">
        <div className="font-extrabold font-[homeworld-norm] text-sm">RIEPILOGO</div>
        <div className="font-xs">
          <div>disponibile:{stats.AvTrue}</div>
          <div> nello zaino:{stats.ReTrue}</div>
          {stats.AvFalse !== 0 && <div> da prendere:{stats.AvFalse}</div>}
          {stats.ReFalse !== 0 && (
            <div> da mettere nello zaino:{stats.ReFalse}</div>
          )}
        </div>
      </div>
    </>
  );
}
