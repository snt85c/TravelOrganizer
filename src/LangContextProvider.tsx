import { createContext } from "react";

//create an object with all the reference words to use in two different languages (it and eng)

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
        toggledescr:"available | packed | remove",
        toggledescrDISABLED:"available | packed "

    },
    itemComponent:{
        name:"item"
    },
    itemListComponent:{
        readonlyMessage:" it's not possible to modify other user's info"
    },
    

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
            toggledescr:"disponibile | nello zaino | rimuovi",
            toggledescrDISABLED:"disponibile | nello zaino"
        },
        itemComponent:{
            name:"nome"
        },
        itemListComponent:{
            readonlyMessage:" non è possibile modificare le informazioni di altri utenti"
        },
    },
  };

  export const LangContext = createContext(lang.en);