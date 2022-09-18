import { createContext } from "react";

//create an object with all the reference words to use in two different languages (it and eng)

export const lang = {
  en: {
    header: {
      headerHead: "HEAD",
      headerTorso: "CHEST",
      headerLegs: "LEGS",
      headerFeet: "FEET",
      headerExtra: "EXTRA",
      setNumAllAvailable: "all items are ready to be packed",
      setNumAvailable: " items ready to be packed",
      setNumAllReady: "all the items are in the bag",
      setNumReady: " items in the bag",
      emptyBag: "add some items",
    },
    button: {
      showOtherButton: "Show users",
    },
    stats: {
      statsHeader: "RECAP",
      statsPacked: "packed: ",
      statsToCollect: "to get: ",
      statsToPack: "to pack: ",
      statsAllPacked: "all the available items are packed: ",
      statsAvailable: "available: ",
    },
    itemListArrayComponent: {
      add: "add",
      unavailable: "unavailable",
      available: "available",
      ready: "ready",
    },
    itemComponent: {
      name: "item",
      modify: "modify",
      remove: "remove",
      confirm: "confirm",
    },
    itemListComponent: {
      readonlyMessage: " it's not possible to modify other user's info",
      highlightInstruction: "double click to highlight the item",
    },
    swipeComponent: {
      delete: "Delete?",
      deleteLx: "Delete",
      highlight: "Highlight",
      swipeInstructionLx: "swipe >> to delete",
      swipeInstructionRx: "swipe << to highlight",
    },
    createNewTravelComponent: {
      createFlairText: "CREATE YOUR OWN TRAVEL",
      add: "Add ",
    },
    presentationPage: {
      flairText1: "AVAILABLE TRAVELS",
      loading: "LOADING",
      fetchingDelayMessage:
        "the website is taking too long: consider refresing the page,check your internet connection or try later",
    },
    travelButtonItem:{
      createdBy:"created by: "
    },
    editButtonItem:{
      name:"Edit",
      delete:"DELETE",
      rename:"RENAME",
      delete1:"press to delete",
      delete2:"this will cancel your data permanently"
    },
    JoinTravelButton:{
      name:"Join"
    },
    usersButton:{
      nousers:"NO USERS",
      travellers:"Travellers"
    }
  },
  it: {
    header: {
      headerHead: "TESTA",
      headerTorso: "TORSO",
      headerLegs: "GAMBE",
      headerFeet: "PIEDI",
      headerExtra: "EXTRA",
      setNumAllAvailable:
        "tutti gli oggetti sono pronti ad essere messi nello zaino",
      setNumAvailable: " oggetti pronti per lo zaino",
      setNumAllReady: "tutti gli oggetti di questa categoria sono nello zaino",
      setNumReady: " oggetti nello zaino",
      emptyBag: "aggiungi degli elementi",
    },
    button: {
      showOtherButton: "Mostra utenti",
    },
    stats: {
      statsHeader: "RIEPILOGO",
      statsAvailable: "disponibile: ",
      statsPacked: "nello zaino: ",
      statsToPack: "da mettere nello zaino: ",
      statsAllPacked: "tutti gli elementi disponibili sono nello zaino: ",
      statsToCollect: "da prendere: ",
    },
    itemListArrayComponent: {
      add: "aggiungi",
      unavailable: "mancante",
      available: "presente",
      ready: "pronto",
    },
    itemComponent: {
      name: "nome",
      modify: "modifica",
      remove: "rimuovi",
      confirm: "conferma",
    },
    itemListComponent: {
      readonlyMessage:
        " non è possibile modificare le informazioni di altri utenti",
      highlightInstruction: "doppio click per evidenziare elemento",
    },
    swipeComponent: {
      delete: "Elimina?",
      deleteLx: "Elimina",
      highlight: "Evidenzia",
      swipeInstructionLx: "swipe >> per cancellare",
      swipeInstructionRx: "swipe << per evidenziare",
    },
    createNewTravelComponent: {
      createFlairText: "CREA UN NUOVO VIAGGIO",
      add: "Aggiungi ",
    },
    presentationPage: {
      flairText1: "VIAGGI DISPONIBILI",
      loading: "CARICAMENTO",
      fetchingDelayMessage:
        "the website is taking too long: consider refresing the page,check your internet connection or try later",
    },
    travelButtonItem:{
      createdBy:"creato da: "
    },
    editButtonItem:{
      name:"Cambia",
      delete:"CANCELLA",
      rename:"RINOMINA",
      delete1:"premi per cancellare",
      delete2:"elimina i dati permanentemente"
    },
    JoinTravelButton:{
      name:"Entra"
    },
    usersButton:{
      nousers:"NESSUN UTENTE",
      travellers:"Viaggiatori"
    }


  },
};

export const LangContext = createContext(lang.en);
