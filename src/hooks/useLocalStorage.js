import { useState } from "react";
import LogRocket from "logrocket";
const useLocalStorage=(key, initialValue)=>{
    const[storedValue,setStoredValue]=useState(()=>{
        try{
            const item = localStorage.getItem(key);
            return item? JSON.parse(item):initialValue;
        }
        catch(error){
            return initialValue;
        }
    });
    const setValue=(value)=>{
        try{
            const valueToStore = value instanceof Function? value(storedValue):value;
            setStoredValue(valueToStore)
            window.localStorage.setItem(key,JSON.stringify(valueToStore))
        }
        catch(error){
            LogRocket.error(error);
        }
    }
    return[storedValue,setValue];
}
export default useLocalStorage;