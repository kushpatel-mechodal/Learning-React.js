// this approach is use for production projects

import { createContext, useContext } from "react";

export const TheamContext = createContext({
    theamMode: "light", //default light mode
    darkTheam: () => {},
    lightTheam: () => {},
});

export const TheamProvider = TheamContext.Provider; //export the provider

//create custom hook useTheam
export default function useTheam(){
    return useContext(TheamContext);
}