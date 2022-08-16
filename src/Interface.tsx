import { useRef, useEffect } from "react";

export interface iUser {
  id: number;
  tName: string;
  headgear: iGear[];
  topgear: iGear[];
  bottomgear: iGear[];
  footgear: iGear[];
  extra: iGear[];
  userInfo: iUserInfo;
}

export interface iTravelData {
  [id: number]: {
    id: number;
    tName: string;
    name: string;
    headgear: iGear[];
    topgear: iGear[];
    bottomgear: iGear[];
    footgear: iGear[];
    extra: iGear[];
    userInfo: iUserInfo;
  };
  userInfo: iUserInfo;
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
  createdBy: string;
  userName: string;
}

export interface iTriggers {
  isShowUserButton: boolean;
  setIsShowUserButton: React.Dispatch<React.SetStateAction<boolean>>;
  isJoining: boolean;
  setIsJoining: React.Dispatch<React.SetStateAction<boolean>>;
  isWatching: boolean;
  setIsWatching: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: number;
  setTrigger: React.Dispatch<React.SetStateAction<number>>;
}

export interface iEditingPackage {
  isEditing: boolean;
  isDeleting: boolean;
  isRenaming: boolean;
  newName:string,
  setNewName:React.Dispatch<React.SetStateAction<string>>,
  setIsEditing:React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleting:React.Dispatch<React.SetStateAction<boolean>>
  setIsRenaming:React.Dispatch<React.SetStateAction<boolean>>
  defaultName:string

}
