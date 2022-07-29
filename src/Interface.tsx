export interface iUser {
  headgear: iGear[];
  topgear: iGear[];
  bottomgear: iGear[];
  footgear: iGear[];
  extra: iGear[];
  userInfo: iUserInfo;
}

export interface iTravelData {
  [id:number]: {
    id:number;
    tName:string;
    headgear: iGear[];
    topgear: iGear[];
    bottomgear: iGear[];
    footgear: iGear[];
    extra: iGear[];
    userInfo: iUserInfo;
  };
}

export interface iUserInfo {
  displayName: string;
  uid: string;
  photoURL: string;
}

export interface iGear {
  name: string;
  ready: boolean;
  highlighted: boolean;
  status: "unavailable" | "available" | "ready";
}

export interface iTravel {
  name: String;
  id: number;
}
