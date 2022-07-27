import flairImage from "./img/undraw_explore_re_8l4v.svg";
import flairImage2 from "./img/undraw_journey_re_ec5q.svg";
import flairImage3 from "./img/undraw_travelers_re_y25a.svg";
import TravelButtonItem from "./TravelButtons";
import CreateNewTravel from "./CreateNewTravel";
import { iTravel } from "./Interface";
import { useEffect } from "react";

export default function PresentationPage(props: {
  travelList: [iTravel?];
  // setTravel: React.Dispatch<React.SetStateAction<String>>;
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  const travelButtonsList = props.travelList.map(
    (currentData?: iTravel, i?: number) => {
      return (
        <TravelButtonItem
          key={i}
          i={i}
          data={currentData}
          // setTravel={props.setTravel}
          travelList={props.travelList}
          setTravelList={props.setTravelList}
        />
      );
    }
  );

  return (
    <div className="flex flex-col my-5 justify-between h-[80%]">
      <div className="flex my-5 justify-center items-center font-[homeworld-bold]">
        BACKPACK ORGANIZER
      </div>
      <div className="flex flex-col w-[1/4] p-2">
        <div>{travelButtonsList}</div>
        <CreateNewTravel
          travelList={props.travelList}
          setTravelList={props.setTravelList}
        />
      </div>
      <img
        src={flairImage3}
        style={{
          backgroundImage:
            "radial-gradient(ellipse, rgb(100 116 139), transparent 70%)",
        }}
        className="absolute h-[200px] bottom-10 right-10 "
      />
    </div>
  );
}
