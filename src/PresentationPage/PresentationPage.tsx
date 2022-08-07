import flairImage from "../img/undraw_travelers_re_y25a.svg";
import TravelButtonItem from "./TravelButtonItem";
import CreateNewTravel from "./CreateNewTravel";
import { iTravel, iUserInfo } from "../Interface";
import { useState } from "react";

export default function PresentationPage(props: {
  user: iUserInfo;
  loggedUser: any;
  travelList: [iTravel?];
  setTravel: React.Dispatch<React.SetStateAction<iTravel>>;
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
  watchTravel: Function
}) {
  const travelButtonsList = props.travelList.map(
    (currentData?: iTravel, i?: number) => {
      return (
        <TravelButtonItem
          key={i}
          i={i}
          loggedUser={props.loggedUser}
          data={currentData}
          setTravel={props.setTravel}
          travelList={props.travelList}
          setTravelList={props.setTravelList}
          watchTravel={props.watchTravel}
        />
      );
    }
  );

  return (
    <>
      <div className="flex flex-col   my-5 justify-between h-[80%]">
        <>
          <div className="flex mt-5 justify-center items-center font-[homeworld-norm] select-none">
            AVAILABLE TRAVELS
          </div>
          <div className="flex z-20 flex-col w-[1/4] p-2 ">
            <div>{travelButtonsList}</div>
            <CreateNewTravel
              loggedUser={props.loggedUser}
              user={props.user}
              travelList={props.travelList}
              setTravelList={props.setTravelList}
            />
          </div>
        </>

        <div className=" absolute z-10 bottom-7 left-2  font-[phonk] leading-none select-none">
          <div className="flex text-[20vw] sm:text-[8rem]">Travel</div>
          <div className="text-[10vw] sm:text-[4rem] -mt-[3vh]">organizer<span className="text-[3vw] sm:text-[1rem] -mt-[3vh]">by Snt</span></div>
        </div>
        <img
          src={flairImage}
          style={{
            backgroundImage:
              "radial-gradient(ellipse, rgb(100 116 139), transparent 70%)",
          }}
          className="absolute h-[100px] hidden sm:flex md:h-[200px] bottom-10 right-5 md:right-10 "
        />
      </div>
    </>
  );
}