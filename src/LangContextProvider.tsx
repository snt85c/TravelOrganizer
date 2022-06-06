import { createContext } from "react";

export const lang = {
    en: {header:{
        headerHead: "HEAD",
        headerTorso: "CHEST",
        headerLegs:"LEGS",
        headerFeet:"FEET",
        headerExtra: "EXTRA",
        setNumAllAvailable:"all items are ready to be packed",
        setNumAvailable: " items ready to be packed",
        setNumAllReady:"all the items are in the bag",
        setNumReady:" items in the bag",
        emptyBag:"add some items",

    },
    button:{
        showOtherButton:"Show users",
    },
    stats:{
        statsHeader: "RECAP",
        statsPacked:"packed: ",
        statsToCollect:"to get: ",
        statsToPack:"to pack: ",
        statsAllPacked:"all the available items are packed: ",
        statsAvailable:"available: ",
    },
    itemListArrayComponent:{
        add:"add",
        toggledescr:"available | packed | remove"
    },
    itemComponent:{
        name:"item"
    }
    

    },
    it: {

        header:{
            headerHead: "TESTA",
            headerTorso: "TORSO",
            headerLegs:"GAMBE",
            headerFeet:"PIEDI",
            headerExtra: "EXTRA",
            setNumAllAvailable:"tutti gli oggetti sono pronti ad essere messi nello zaino",
            setNumAvailable: " oggetti pronti per lo zaino",
            setNumAllReady:"tutti gli oggetti di questa categoria sono nello zaino",
            setNumReady: " oggetti nello zaino",
            emptyBag:"aggiungi degli elementi",

        },
        button:{
            showOtherButton:"Mostra utenti",

        },
        stats:{
            statsHeader: "RIEPILOGO",
            statsAvailable:"disponibile: ",
            statsPacked:"nello zaino: ",
            statsToPack:"da mettere nello zaino: ",
            statsAllPacked:"tutti gli elementi disponibili sono nello zaino: ",
            statsToCollect:"da prendere: ",
        },
        itemListArrayComponent:{
            add:"aggiungi",
            toggledescr:"disponibile | nello zaino | rimuovi"
        },
        itemComponent:{
            name:"nome"
        }
    },
  };

  export const LangContext = createContext(lang.en);